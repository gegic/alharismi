export class Scene {
  content: string;
  focus?: string;
  focusTimer?: number;
  script: (() => void) | null;
  isFirst = true;
  isLast = true;

  played: 'not_played' | 'playing' | 'played' = 'not_played';
  set = true;

  constructor(jsonScene: {content?: string, scriptPath: string}) {
    this.content = jsonScene.content;
  }
}
