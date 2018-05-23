let Toggler = (function() {
   // PRIVATE
   function init(options) {
      const toggleTarget        = [].slice.call(document.querySelectorAll(`.${options.wrapperClass} [data-toggler-target]`));
      const toToggle            = [].slice.call(document.querySelectorAll(`.${options.wrapperClass} [data-to-toggle]`));
      const nestedToToggle      = [].slice.call(document.querySelectorAll(`.${options.wrapperClass} .${options.nestedToToggle}`));
      const nestedTogglerTarget = [].slice.call(document.querySelectorAll(`.${options.wrapperClass} .${options.nestedTogglerTarget}`));

      // Set defaults
      if (options.nested === undefined) options.nested = false;
      if (options.activeClass === undefined) options.activeClass = 'active';
      if (options.targetElType === undefined) options.targetElType = 'ul';
      if (options.wrapperClass === undefined) console.log('Please pass in a wrapperClass to init for the Toggler function.');

      function soloCheck(array, arrayData, event) {
         if (options.solo !== false) {
            array.filter(function(item) {
               if (options.nested === true) {
                  return item !== event.target;
               }
               else {
                  return (item !== document.querySelector(`.${options.wrapperClass} [data-to-toggle="${arrayData}"]`));
               }
            }).map(function(item) {
               item.classList.remove(options.activeClass);
            });
         }
      }

      if (options) {
         if (options.nested === true) {
            nestedTogglerTarget.forEach(function(item) {
               item.addEventListener("click", function(event) {
                  const clicked = event.target;

                  if (!clicked.querySelector(options.targetElType).classList.contains('active')) soloCheck(nestedToToggle, '', event);
                  clicked.querySelector(options.targetElType).classList.toggle(options.activeClass);
               });
            });
         }
         else {
            toggleTarget.forEach(function(target) {
               target.addEventListener("click", function(event) {
                  let toToggleData = event.currentTarget.getAttribute("data-toggler-target");
                  soloCheck(toToggle, toToggleData, event);
                  document.querySelector(`.${options.wrapperClass} [data-to-toggle="${toToggleData}"]`).classList.toggle(options.activeClass);
               });
            });
         }
      }
   }

   // PUBLIC
   return {
      init: init
   };
}());
