import * as React from "react";
import { isIOS, isSafari } from "react-device-detect";
import ReactDOM from "react-dom";
import { AdditiveBlending, BackSide, Matrix3, ShaderMaterial } from "three";
import videojs from "video.js";
import { MediaProjection } from "../../../common/models-v2";
import { base64ToBytes, bytesToBase64 } from "../../utils/base64";
import { PlayerControlBar } from "./player-control-bar";
import { VRContext, VRController, VRPlayer } from "./player.interface";
import * as _ from "lodash";
import { PlayerMultiFrame } from "./player-multi-frame";
import { getEnumValue } from "../../utils/graphql-util";
import { AppInsightEventHelper } from "../../utils/appInsight-event-helper";
import { useApolloClient } from "@apollo/client";
import { useFetchUser } from "../../lib/user";
import { useUserProfile } from "../../context/user-profile";
import { useRouter } from "next/router";
import { useScene } from "../../context/scene";

const DRM_PROVIDER_URL_STAGING = {
  FAIRPLAY_CERT_URL:
    "https://lic.staging.drmtoday.com/license-server-fairplay/cert/aikhun",
  FAIRPLAY_LICENSE_URL:
    "https://lic.staging.drmtoday.com/license-server-fairplay/",
  WIDEVINE_CENC_URL:
    "https://lic.staging.drmtoday.com/license-proxy-widevine/cenc/",
};

const DRM_PROVIDER_URL_PROD = {
  FAIRPLAY_CERT_URL:
    "https://lic.drmtoday.com/license-server-fairplay/cert/aikhun",
  FAIRPLAY_LICENSE_URL: "https://lic.drmtoday.com/license-server-fairplay/",
  WIDEVINE_CENC_URL: "https://lic.drmtoday.com/license-proxy-widevine/cenc/",
};

// The actual plugin function is exported by this module, but it is also
// attached to the `Player.prototype`; so, there is no need to assign it
// to a variable.
require("videojs-vr");
require("videojs-contrib-quality-levels");
// require("videojs-contrib-dash");
require("videojs-contrib-eme");

type VideoProps = React.DetailedHTMLProps<
  React.VideoHTMLAttributes<HTMLVideoElement>,
  HTMLVideoElement
>;

// export interface PlayerSocketSettingProps {
//   channelId?: string;
// }

export interface PlayerDRMInfo {
  drmTodayAssetId?: string;
  drmTodayService?: "staging" | "prod";
}

export interface SendAppInsightEventArgs {
  operation: "PLAY" | "PAUSE" | "DRAG";
  videoTimestamp?: number;
  videoPercentage?: number;
  fromVideoPercentage?: number;
  fromVideoTimestamp?: number;
  toVideoPercentage?: number;
  toVideoTimestamp?: number;
}

export type PlayerProps = VideoProps & {
  url: string;
  type: string;
  projection: MediaProjection; // enum value
  title?: string;
  imprintText?: string;
  onClickChat?: () => void;
  // socketSetting?: PlayerSocketSettingProps;
  onMediaJoin?: (
    viewRatio: number,
    mediaId?: string,
    isPreroll?: boolean
  ) => void;
  onMediaUpdate?: (
    viewRatio: number,
    mediaId?: string,
    isPreroll?: boolean
  ) => void;
  drmInfo?: PlayerDRMInfo;
  nonSkipable?: boolean;
  mediaId?: string;
  moduleId?: string;
  multiFrame?: number;
  onVideoJSReady?: (el: HTMLVideoElement) => void;
  autoFullscreen?: boolean;
  hideControls?: boolean;
  onMediaTimeSeek?: (currentTime: number) => void;
  onPlayClick?: () => void;
  onPauseClick?: () => void;
  onReplayClick?: () => void;
  isPlaying?: boolean;
  disableControls?: boolean; // for modules controlled only by host
};

export const Player = React.memo<PlayerProps>(
  ({
    url,
    type,
    projection,
    title,
    onClickChat,
    imprintText,
    onMediaJoin,
    onMediaUpdate,
    drmInfo,
    nonSkipable,
    mediaId,
    moduleId,
    className,
    autoPlay,
    onVideoJSReady,
    autoFullscreen,
    hideControls,
    onMediaTimeSeek: onMediaTimeSeekFromProps,
    onPlayClick,
    onPauseClick,
    onReplayClick,
    isPlaying,
    disableControls,
    ...props
  }) => {
    const [playerContext, setPlayerContext] = React.useState<VRContext>();
    const videoElRef = React.useRef<HTMLVideoElement>(null);
    const materialOrigin = React.useRef({} as { left: any; right: any });
    const material3D = React.useRef({} as { left: any; right: any });

    const client = useApolloClient();
    const router = useRouter();
    const { user } = useFetchUser();
    const { location } = useUserProfile();
    const { currentScene } = useScene();

    const set3DMode = React.useCallback(
      (mode: "single" | "stereo", vr: VRController = playerContext!.vr) => {
        const { camera, scene } = vr;
        const [leftScene, rightScene] = scene.children;
        if (mode === "single") {
          const { left, right } = materialOrigin.current;
          leftScene.material = left;
          rightScene.material = right;
          camera.layers.disable(2);
        } else if (mode === "stereo") {
          const { left, right } = material3D.current;
          leftScene.material = left;
          rightScene.material = right;
          camera.layers.enable(2);
        }
      },
      [materialOrigin, material3D, playerContext]
    );

    React.useEffect(() => {
      if (!videoElRef.current) {
        return;
      }

      let player: VRPlayer;
      let vr: VRController;

      if (playerContext) {
        player = playerContext.player;
        vr = playerContext.vr;
      } else {
        player = videojs(videoElRef.current, {
          responsive: true,
          controls: !(onPauseClick && onPlayClick),
          autoplay: !_.isUndefined(autoPlay) ? autoPlay : false,
          preload: "auto",
          html5: {
            dash: {
              limitBitrateByPortal: true,
            },
          },
        }) as VRPlayer;

        if (autoFullscreen) {
          player.on("play" as any, () => {
            try {
              player.requestFullscreen();
            } catch (err) {
              console.log(err);
            }
          });
        }
        player.ready(
          () =>
            videoElRef.current &&
            onVideoJSReady &&
            onVideoJSReady(videoElRef.current)
        );

        (player as any).eme();

        vr = player.vr({
          projection,
          debug: false,
          forceCardboard: false,
        });

        vr.on(
          "initialized",
          (event: any, { instance: vr }: { instance: VRController }) => {
            if (
              projection ===
              getEnumValue(MediaProjection, MediaProjection.prj_360_TB)
            ) {
              const { scene } = vr;
              const [leftScene, rightScene] = scene.children;
              materialOrigin.current.left = leftScene.material;
              materialOrigin.current.right = rightScene.material;
              material3D.current.left = createAnaglyphMaterial("left", vr);
              material3D.current.right = createAnaglyphMaterial("right", vr);
              set3DMode("stereo", vr);
            }
          }
        );

        setPlayerContext({
          vr,
          player,
        });
      }

      (player as any).src({
        src: url,
        type,
        ...(drmInfo && { keySystems: getKeySystems(drmInfo) }),
      });

      player.load();
    }, [
      videoElRef,
      projection,
      url,
      type,
      drmInfo,
      playerContext,
      autoPlay,
      set3DMode,
      autoFullscreen,
      onVideoJSReady,
    ]);

    React.useEffect(
      () => () => {
        if (!videoElRef.current) {
          return;
        }
        playerContext?.player.dispose();
      },
      [playerContext]
    );

    React.useEffect(
      () => () => {
        if (!videoElRef.current) {
          return;
        }
        playerContext?.player.dispose();
      },
      []
    );

    const playerRef = playerContext?.player;

    const sendAppInsightEvent = ({
      operation,
      videoTimestamp,
      videoPercentage,
      fromVideoPercentage,
      fromVideoTimestamp,
      toVideoPercentage,
      toVideoTimestamp,
    }: SendAppInsightEventArgs) => {
      const appInsightHelper = AppInsightEventHelper.instance(client);
      appInsightHelper.sendMediaEvent({
        eventId: router.query.event_id! as string,
        user: user!,
        location: location!,
        sessionId: router.query.session_id! as string,
        sceneId: currentScene?.id ?? "",
        mediaId: mediaId!,
        moduleId: moduleId!,
        operation: operation,
        ...(operation !== "DRAG" && {
          videoTimestamp,
          videoPercentage,
        }),
        ...(operation === "DRAG" && {
          fromVideoPercentage,
          fromVideoTimestamp,
          toVideoPercentage,
          toVideoTimestamp,
        }),
      });
    };

    const onMediaTimeSeek = (currentTime: number, mode: "drag" | "click") => {
      if (playerRef && currentTime && mode === "drag") {
        sendAppInsightEvent({
          operation: "DRAG",
          fromVideoTimestamp: playerRef.currentTime(),
          fromVideoPercentage: playerRef.currentTime() / playerRef.duration(),
          toVideoTimestamp: currentTime,
          toVideoPercentage: currentTime / playerRef.duration(),
        });
      }
      if (onMediaTimeSeekFromProps) onMediaTimeSeekFromProps(currentTime);
    };

    return (
      <div data-vjs-player>
        <video
          ref={videoElRef}
          playsInline={true}
          className={`video-js vjs-default-skin videojs-vr-player-dimensions vjs-controls-enabled vjs-workinghover vjs-v7 vjs-has-started vjs-user-active vjs-paused vjs-fluid ${
            className ?? ""
          }`}
          tabIndex={-1}
          lang="en-us"
          role="region"
          aria-label="Video Player"
          onPlay={() => {
            if (playerRef) {
              sendAppInsightEvent({
                operation: "PLAY",
                videoTimestamp: playerRef.currentTime(),
                videoPercentage: playerRef.currentTime() / playerRef.duration(),
              });
            }
          }}
          onPause={() => {
            if (playerRef) {
              sendAppInsightEvent({
                operation: "PAUSE",
                videoTimestamp: playerRef.currentTime(),
                videoPercentage: playerRef.currentTime() / playerRef.duration(),
              });
            }
          }}
          // onEnded={onMediaEnd}
          onClick={
            onPauseClick &&
            onPlayClick &&
            (() => {
              if (disableControls) return;
              isPlaying ? onPauseClick?.() : onPlayClick?.();
            })
          }
          {...props}
        ></video>
        {projection ===
          getEnumValue(MediaProjection, MediaProjection.prj_MULTI_FRAME) &&
          videoElRef.current?.parentElement &&
          ReactDOM.createPortal(
            <PlayerMultiFrame videoEl={videoElRef.current} frames={4} />,
            videoElRef.current?.parentElement
          )}
        {playerRef &&
          videoElRef.current?.parentElement &&
          ReactDOM.createPortal(
            <PlayerControlBar
              player={playerRef}
              projection={projection}
              title={title}
              on2DOnlySwitchChange={(checked) =>
                checked ? set3DMode("single") : set3DMode("stereo")
              }
              onClickChat={onClickChat}
              onMediaJoin={onMediaJoin}
              onMediaUpdate={onMediaUpdate}
              {...(imprintText && { imprintText })}
              nonSkipable={nonSkipable}
              mediaId={mediaId}
              moduleId={moduleId}
              hideControls={hideControls}
              onMediaTimeSeek={onMediaTimeSeekFromProps && onMediaTimeSeek}
              onPlayClick={onPlayClick}
              onPauseClick={onPauseClick}
              onReplayClick={onReplayClick}
              disableControls={disableControls}
            />,
            videoElRef.current.parentElement
          )}
      </div>
    );
  }
);

const colorMatrixLeft = new Matrix3().fromArray([
  1.0671679973602295,
  -0.0016435992438346148,
  0.0001777536963345483, // r out
  -0.028107794001698494,
  -0.00019593400065787137,
  -0.0002875397040043026, // g out
  -0.04279090091586113,
  0.000015809757314855233,
  -0.00024287120322696865, // b out
]);

//		red						green 						blue  						in

const colorMatrixRight = new Matrix3().fromArray([
  -0.0355340838432312,
  -0.06440307199954987,
  0.018319187685847282, // r out
  -0.10269022732973099,
  0.8079727292060852,
  -0.04835830628871918, // g out
  0.0001224992738571018,
  -0.009558862075209618,
  0.567823588848114, // b out
]);

const createAnaglyphMaterial = (eye: "left" | "right", vr: VRController) => {
  const { videoTexture } = vr;

  const material = new ShaderMaterial({
    uniforms: {
      map: { value: videoTexture },
      colorMatrix: {
        value: eye === "left" ? colorMatrixLeft : colorMatrixRight,
      },
    },

    vertexShader: [
      "varying vec2 vUv;",

      "void main() {",
      "  vUv = vec2( uv.x, uv.y );",
      "  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
      "}",
    ].join("\n"),

    fragmentShader: [
      "uniform sampler2D map;",
      "varying vec2 vUv;",

      "uniform mat3 colorMatrix;",

      // These functions implement sRGB linearization and gamma correction

      "float lin( float c ) {",
      "  return c <= 0.04045 ? c * 0.0773993808 :",
      "    pow( c * 0.9478672986 + 0.0521327014, 2.4 );",
      "}",

      "vec4 lin( vec4 c ) {",
      "  return vec4( lin( c.r ), lin( c.g ), lin( c.b ), c.a );",
      "}",

      "float dev( float c ) {",
      "  return c <= 0.0031308 ? c * 12.92",
      "    : pow( c, 0.41666 ) * 1.055 - 0.055;",
      "}",

      "void main() {",
      "	vec2 uv = vUv;",
      "	vec4 colorLin = lin( texture2D( map, uv ) );",
      "	vec3 color = clamp(colorMatrix * colorLin.rgb, 0., 1. );",
      "	gl_FragColor = vec4( dev( color.r ), dev( color.g ), dev( color.b ), colorLin.a );",
      "}",
    ].join("\n"),
  });

  material.blending = AdditiveBlending;
  material.transparent = true;
  material.side = BackSide;

  return material;
};

const widevineGetLicense = (uri: string, keyMessage: any, CUSTOM_DATA: any) =>
  new Promise<{ err?: any; license?: ArrayBuffer }>((resolve) => {
    const headers = {
      "Content-type": "application/octet-stream",
      "x-dt-custom-data": btoa(JSON.stringify(CUSTOM_DATA)),
    };

    videojs.xhr(
      {
        uri,
        method: "POST",
        body: keyMessage,
        headers,
      },
      (err, response, responseBody) => {
        if (err) {
          resolve({ err });
          return;
        }

        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        if (response?.statusCode! >= 400 && response?.statusCode! <= 599) {
          // Pass an empty object as the error to use the default code 5 error message
          resolve({ err: {} });
          return;
        }
        // Assume the response object is treated as a string named responseString
        // Parse the JSON string response into an object.
        const json = JSON.parse(responseBody);
        // This is a base64-encoded version of the raw license.
        const rawLicenseBase64 = json["license"];
        // Decode it to a string.
        const rawLicenseString = atob(rawLicenseBase64);
        // Convert that string into a Uint8Array
        const data = new Uint8Array(rawLicenseString.length);
        for (let i = 0; i < rawLicenseString.length; ++i) {
          data[i] = rawLicenseString.charCodeAt(i);
        }
        const licenseData = data.buffer;

        videojs.xhr(
          { uri, method: "POST", body: licenseData, headers },
          (err, response, responseBody) => {
            resolve({ license: licenseData });
          }
        );
      }
    );
  });

const fairplayGetCertificate = (url: string, CUSTOM_DATA: any) =>
  new Promise<{ err?: any; license?: ArrayBuffer }>((resolve) => {
    videojs.xhr(
      {
        url,
        method: "GET",
        responseType: "arraybuffer",
        headers: {
          "x-dt-custom-data": btoa(JSON.stringify(CUSTOM_DATA)),
          Pragma: "no-cache",
          "Cache-Control": "no-cache",
          "Content-Type": "text/xml; charset=utf-8",
        },
      },
      (err, response, responseBody) => {
        if (err) {
          resolve({ err });
          return;
        }
        console.log("Fairplay: certificate acquired");
        const responseData = new Uint8Array(responseBody);
        resolve({ license: responseData });
      }
    );
  });

const fairplayGetLicense = (
  url: string,
  keyMessage: any,
  CUSTOM_DATA: any,
  drmTodayAssetId?: string
) =>
  new Promise<{ err?: any; license?: ArrayBuffer }>((resolve) => {
    const assetId = encodeURIComponent(drmTodayAssetId ?? "");
    const spcMessage = encodeURIComponent(bytesToBase64(keyMessage));
    const body = `spc=${spcMessage}&assetId=${assetId}`;
    videojs.xhr(
      {
        url,
        method: "POST",
        responseType: "text",
        body,
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
          "x-dt-custom-data": btoa(JSON.stringify(CUSTOM_DATA)),
        },
      },
      (err, response, responseBody) => {
        if (err) {
          resolve({ err });
          return;
        }
        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        if (response?.statusCode! >= 400 && response?.statusCode! <= 599) {
          resolve({ err: {} });
          return;
        }
        console.log("Fairplay: License Acquired");
        const responseData = base64ToBytes(responseBody);
        resolve({ license: responseData });
      }
    );
  });

const getKeySystems = (drmInfo: PlayerDRMInfo) => {
  const MY_CUSTOM_DATA = {
    userId: "12345",
    sessionId: "RWFzdGVyZWdn",
    merchant: "aikhun",
  };

  const widevine = {
    "com.widevine.alpha": {
      getLicense: (
        emeOptions: any,
        keyMessage: any,
        callback: (err: any, license?: ArrayBuffer) => void
      ) => {
        const url =
          drmInfo.drmTodayService === "prod"
            ? DRM_PROVIDER_URL_PROD.WIDEVINE_CENC_URL
            : DRM_PROVIDER_URL_STAGING.WIDEVINE_CENC_URL;

        widevineGetLicense(url, keyMessage, MY_CUSTOM_DATA).then((res) => {
          res.license ? callback(null, res.license) : callback(res.err || {});
        });
      },
    },
  };

  const fairplay = {
    "com.apple.fps.1_0": {
      getCertificate: (
        emeOptions: any,
        callback: (err: any, license?: ArrayBuffer) => void
      ) => {
        console.log("Fairplay: getCertificate");
        const url =
          drmInfo.drmTodayService === "prod"
            ? DRM_PROVIDER_URL_PROD.FAIRPLAY_CERT_URL
            : DRM_PROVIDER_URL_STAGING.FAIRPLAY_CERT_URL;

        fairplayGetCertificate(url, MY_CUSTOM_DATA).then((res) => {
          res.license ? callback(null, res.license) : callback(res.err || {});
        });
      },

      getLicense: (
        emeOptions: any,
        contentId: string,
        keyMessage: any,
        callback: (err: any, license?: ArrayBuffer) => void
      ) => {
        console.log("Fairplay: getLicense");
        const url =
          drmInfo.drmTodayService === "prod"
            ? DRM_PROVIDER_URL_PROD.FAIRPLAY_LICENSE_URL
            : DRM_PROVIDER_URL_STAGING.FAIRPLAY_LICENSE_URL;

        fairplayGetLicense(
          url,
          keyMessage,
          MY_CUSTOM_DATA,
          drmInfo.drmTodayAssetId
        ).then((res) => {
          res.license ? callback(null, res.license) : callback(res.err || {});
        });
      },
    },
  };

  return {
    ...(isIOS || isSafari ? fairplay : widevine),
  };
};
