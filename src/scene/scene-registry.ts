import { SCENE_V1 } from "./scene-v1";

/**
 * Scene IDs are stable config keys saved in Lovelace YAML.
 * Labels are only for the UI editor.
 */
export const SCENE_OPTIONS = [
  { value: "wide_v1", label: "Wide 16:9 ver V1" },
  { value: "wide_v1_test", label: "Wide 16:9 ver V1test" }
] as const;

export type SceneId = (typeof SCENE_OPTIONS)[number]["value"];

export const SCENES: Record<SceneId, any> = {
  wide_v1: SCENE_V1,
  wide_v1_test: SCENE_V1
};
