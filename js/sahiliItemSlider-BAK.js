/**
 * SAHILIBOX 
 *
 * VERSION 0.1.0
 *
 * CAHNGELOG
 * 
 * VERSION 1.0
 * - ADDED: DEFAULT THEME
 * - ADDED: OVERLAY
 * - ADDED: PAGINATION
 * - ADDED: PLUGIN CORE
 *
 * author Dominik Matt <dma@massiveart.com>
 */



(function ($) {
    var sisClass = function($slider, options) {
        var sis = {
            items: [],
            activeItem: 0,
            init: function()
            {
                sis.initEvents();
            },
            
            /*
             * create events for the itemslider
             */
            initEvents: function()
            {
                $slider.find('.next').on('click', function() {
                   sis.nextItem(); 
                });
                
                $slider.find('.prev').on('click', function() {
                   sis.prevItem(); 
                });
            },
            
            /*
             * call this function to reload the items in the slider
             */
            reloadItemSlider: function()
            {
                sis.clearSlider();
                sis.setItems();
            },
            
            /*
             * delete all items from the slider
             */
            clearSlider: function()
            {
                $slider.find('ul li').remove();
            },
            
            /*
             * set the items from the object to the slider
             */
            setItems: function()
            {
                $.each(sis.items, function(i, value) {
                    var classAddon = '';
                    if(i == sis.activeItem) {
                        classAddon = ' active';
                    }
                    $slider.find('ul').append('<li class="slide' + classAddon + '" data-slide-index="' + i + '">' + value + '</li>');
                });
            }
        };
        
        sis.init();
        
        /*
        * DEFINE USER ACTIONS
        */
        this.test = function() {
            console.log('test');
        }
    }
    /*******************************************************************************************************/

    $.fn.sahiliItemSlider = function (options) {
        var $slider = $(this);

        options = $.extend({
            showItems: 6,
            startSlider: function(element) {},
            slideEnded: function(index) {}
        }, options);

        return this.each(function () {
            return new sisClass($(this), options);
        });
    }
    
    $.fn.sahiliItemSlider.test = function() {
        console.log('test');
    }

})(jQuery);
