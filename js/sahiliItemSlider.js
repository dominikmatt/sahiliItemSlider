/**
 * SAHILIITEMSLIDER
 *
 * VERSION 0.1.0
 *
 * CAHNGELOG
 * 
 * VERSION 1.0
 *
 * author Dominik Matt <dma@massiveart.com>
 */


$.fn.sahiliItemSlider = function(options){
    
    var sisClass = function($slider) {
        
    
        options = $.extend({
            showItems: 1,
            startSlide: function(index) {},
            slideEnded: function(index) {}
        }, options);
        
        
        
        var sis = {
            items: [],
            activeItem: 0,
            itemLength: 0,
            
            init: function()
            {
                sis.initEvents();
                sis.setViewportWidth();
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
            
            setViewportWidth: function() 
            {
                sis.items.push('');
                sis.reloadItemSlider();
                sis.itemLength = $slider.find('ul li').outerWidth(true);
                sis.deleteAllItems();
                var width = sis.itemLength * options.showItems;
                $slider.find('.viewport').css('width', width + 'px');
            },
            
            /*
             * call this function to reload the items in the slider
             */
            reloadItemSlider: function()
            {
                sis.clearSlider();
                sis.setItems();
                sis.setContainerWidth();
            },
            
            setContainerWidth: function() 
            {
                var width = sis.items.length*100;
                $slider.find('ul').css('width', width + '%');
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
                sis.slideToIndex(sis.activeItem);
            },
            
            /*
             * will calculate the center item in the navigation and then the function will do the animation
             */
            slideToIndex: function(index) 
            {
                if(sis.items.length > index) {
                    options.startSlide(index);
                    sis.activeItem = index;
                    var marginLeft = -(sis.itemLength*index);
                    $slider.find('ul').stop().animate({
                        'marginLeft': marginLeft + 'px'
                    }, 500, function() {
                        options.slideEnded(index);
                    });
                }
                sis.checkPagination();
            },
            
            checkPagination: function() 
            {
            
                $slider.find('.next').show();
                $slider.find('.prev').show();
                console.log(sis.items);
                if(sis.items.length <= options.showItems) {
                    $slider.find('.next').hide();
                    $slider.find('.prev').hide();
                }
                
                if(sis.items.length <= (sis.activeItem+options.showItems)) {
                    $slider.find('.next').hide();    
                }

                if(sis.activeItem <= 0) {
                    $slider.find('.prev').hide();
                }
            },
            
            prevItem: function() 
            {
                if(sis.activeItem > 0) {
                    var index = sis.activeItem-1;
                    sis.slideToIndex(index);
                } 
            },
            
            nextItem: function() 
            {
                if(sis.items.length > (sis.activeItem+options.showItems)) { 
                    var index = sis.activeItem+1;
                    sis.slideToIndex(index);
                } 
            },
            
            deleteAllItems: function() {
                sis.items = [];
                sis.reloadItemSlider();
            }
        };
        
        sis.init();
    
        /*
        * DEFINE USER ACTIONS
        */
        var actions = {
            addItem: function(item) {
                sis.items.push(item);
                sis.reloadItemSlider();
            },
            
            deleteSingleItems: function(i) {
                
            },
            
            deleteAllItems: function() {
                sis.deleteAllItems();
            }
        };
        
        return actions;
    };
    
    return new sisClass($(this));
    
};
