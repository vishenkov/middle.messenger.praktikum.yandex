import BaseComponent from './base-component';

export default function render(query: string, block: BaseComponent) {
  const root = document.querySelector(query);

  root!.appendChild(block.getContent());
  return root;
}
