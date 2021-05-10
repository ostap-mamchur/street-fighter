import { showModal } from './modal'
import { createElement } from '../../helpers/domHelper';

export function showWinnerModal(fighter) {  
  const title = 'Winner🏆';
  const bodyElement = createBodyElement(fighter);
  const onClose = () => document.location.reload();
  showModal({ title, bodyElement, onClose });
}

function createBodyElement(fighter) {
  const bodyElement = createElement({ tagName: 'div', className: 'winner-fighter' });
  const { name, source } = fighter;
  const nameElement = createElement({ tagName: 'span', className: 'winner-fighter__name' });

  nameElement.innerText = name;
  const attributes = {
    src: source,
    title: name,
    alt: name
  }
  const imageElement = createElement({ tagName: 'img', className: 'winner-fighter__image', attributes });
  bodyElement.append(nameElement, imageElement);
  return bodyElement;
}