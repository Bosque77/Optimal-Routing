declare global {
    interface Window {
      google: typeof google;
    }
  }
  
  export declare namespace google {
    export namespace accounts {
      export namespace id {
        export function initialize(config: any): void;
        export function prompt(): void;
        export function renderButton(
          element: Element | null,
          options?: any
        ): void;
      }
    }
  }
  