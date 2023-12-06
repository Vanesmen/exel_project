import {$} from '@/core/dom';

export function resizeHandler($root, event) {
  const $resizer = $(event.target);

  const $parent = $resizer.closest('[data-type="resizeble"]');

  let value;


  const resizeType = $resizer.data.resize;

  const parentCoords = $parent.getCoords();

  const sideProp = resizeType === 'col' ? 'bottom' : 'right';


  $resizer.css({
    opacity: 1,
    [sideProp]: '-5000px',
  });


  document.onmousemove = e => {
    if (resizeType === 'col') {
      const delta = e.pageX - parentCoords.right;
      value = parentCoords.width + delta;

      $resizer.css({
        right: -delta + 'px',
      });
    } else if (resizeType === 'row') {
      const delta = e.pageY - parentCoords.bottom;
      value = parentCoords.height + delta;

      $resizer.css({
        bottom: -delta + 'px',
      });
    }
  };


  document.onmouseup = () => {
    document.onmousemove = null;
    document.onmouseup = null;

    if (resizeType === 'col') {
      $parent.css({width: value + 'px'});

      $root.findAll(`[data-col="${$parent.data.col}"]`)
          .forEach(el => {
            el.style.width = value + 'px';
          });
    } else if (resizeType === 'row') {
      $parent.css({height: value + 'px'});
    }


    $resizer.css({
      opacity: 0,
      bottom: 0,
      right: 0,
    });
  };
}

