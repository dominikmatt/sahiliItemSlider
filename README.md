sahiliItemSlider
================

jQuery SahiliItemSlider

## How to use:
 
1. Download jQuery-sahiliItemSlider.

2. include css-file in the header: `<link rel="stylesheet" type="text/css" href="css/sahiliItemSlider.css" />`

3. include jquery and sahiliItemSlider-js 
   `<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>`
   `<script type="text/javascript" src="../js/sahiliItemSlider.js"></script>`

4. HTML-Container:
   `<div class="sahiliItemSlider clearfix" id="slider-1">`
        `<div class="prev">prev</div>`
        `<div class="viewport">`
            `<ul class="clearfix">`
                `
            `</ul>`
        `</div>`
        `<div class="next">next</div>`
    `</div>`.

5. initalize the slider `var slider1 = $('#slider-1').sahiliItemSlider();`

6. add item 
   `slider1.addItem('item 1')`;
   `slider1.addItem('item 2')`;


## Options:
  showItems: 1
  startSlide: function(index) {}
  slideEnded: function(index) {}
  
## Functions
  `slider1.addItem('test1');` : add a item to the slider 1
  `slider1.deleteSingleItems(2);` : remove the item with the index 3
  `slider1.delteAllItems();` : remove all items from the slider
