sahiliItemSlider
================

jQuery SahiliItemSlider

## HOW TO USE:
 
1. Download jQuery-sahiliItemSlider.

2. include css-file in the header: `<link rel="stylesheet" type="text/css" href="css/sahiliItemSlider.css" />`

3. include jquery and sahiliItemSlider-js 
   `<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>`
   `<script type="text/javascript" src="../js/sahiliItemSlider.js"></script>`

4. HTML-Container:
   <div class="sahiliItemSlider clearfix" id="slider-1">

        <div class="prev">prev</div>

        <div class="viewport">

            <ul class="clearfix">

                
            </ul>

        </div>`

        <div class="next">next</div>

    </div>.

5. initalize the slider `var slider1 = $('#slider-1').sahiliItemSlider();`

6. add item 
   `slider1.addItem('item 1')`;
   `slider1.addItem('item 2')`;


## CONFIGURATE:
  showItems: [default: 1]
  
## CALLBACKS
  startSlide: function(index, element) {} [is called when the slider starts the slide]
  
  slideEnded: function(index, element) {} [is called when the slider is on the new index]
  
## FUNCTIONS
  `slider1.addItem('<span>item</span>', {'id': '10'});` : add a item to the slider 1, the second param is for the html5 data-attribute (in this example it will create ´data-id="10"´
  
  `slider1.deleteSingleItems(2);` : remove the item with the index 2
  
  `slider1.delteAllItems();` : remove all items from the slider
