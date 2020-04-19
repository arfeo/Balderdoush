export let componentRoot: HTMLElement;

export function renderComponent<T>(component: new () => T, root: HTMLElement): void {
  componentRoot = root;

  new component();
}
