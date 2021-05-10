import { createElement } from '../helpers/domHelper';
import { fighters } from '../helpers/mockData';

export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`,
  });
  // todo: show fighter info (image, name, health, etc.)
  const { name, health, attack, defense, source } = fighter;
  const attributes = {
    src: source,
    title: name,
    alt: name
  }
  const fighterImage = createElement({
    tagName: 'img',
    className: `${positionClassName}__image`,
    attributes
  });

  const fighterName = createElement({
    tagName: 'h3',
    className: `fighter-preview__name`
  });
  fighterName.innerText = name;

  const fighterSkills = createElement({
    tagName: 'ul',
    className: `fighter-preview__skills`
  });

  const fighterHealth = createElement({
    tagName: 'li',
    className: `fighter-preview__health`
  });
  fighterHealth.innerText = `Health: ${health}`;

  const fighterAttack = createElement({
    tagName: 'li',
    className: `fighter-preview__attack`
  });
  fighterAttack.innerText = `Attack: ${attack}`;

  const fighterDefense = createElement({
    tagName: 'li',
    className: `fighter-preview__defense`
  });
  fighterDefense.innerText = `Defense: ${defense}`;
  fighterSkills.append(fighterHealth, fighterAttack, fighterDefense);
  fighterElement.append(fighterName, fighterImage, fighterSkills);
  return fighterElement;
}

export function createFighterImage(fighter) {
  const { source, name } = fighter;
  const attributes = { 
    src: source, 
    title: name,
    alt: name 
  };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes,
  });

  return imgElement;
}
