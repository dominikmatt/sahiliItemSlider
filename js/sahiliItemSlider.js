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


$.fn.sahiliItemSlider = function(options){
    
    var sisClass = function($slider) {
        
    
        options = $.extend({
            showItems: 1,
            startSlide: function(index, element) {},
            slideEnded: function(index, element) {}
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
                sis.items.push({'value': ''});
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
                $.each(sis.items, function(i, item) {
                    var classAddon = '';
                    if(i == sis.activeItem) {
                        classAddon = ' active';
                    }
                    var $li = $('<li/>')
                    $li.html(item['value']);
                    $li.addClass('slide');
                    $li.addClass('item-' + i);
                    $li.addClass(classAddon);
                    $li.data('slide-index', i);

                    if(item['data'] != undefined) {
                        $.each(item['data'], function(key, value) {
                             $li.data(key, value);
                        });
                    }
                    
                    $li.appendTo($slider.find('ul'));

                    
                });
                sis.slideToIndex(sis.activeItem);
            },
            
            /*
             * will calculate the center item in the navigation and then the function will do the animation
             */
            slideToIndex: function(index) 
            {
                if(sis.items.length > index) {
                    var element = $slider.find('li.item-' + index);
                    options.startSlide(index, element);
                    sis.activeItem = index;
                    var marginLeft = -(sis.itemLength*index);
                    $slider.find('ul').stop().animate({
                        'marginLeft': marginLeft + 'px'
                    }, 500, function() {
                        options.slideEnded(index, element);
                    });
                }
                sis.checkPagination();
            },
            
            checkPagination: function() 
            {
            
                $slider.find('.next').show();
                $slider.find('.prev').show();

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
            addItem: function(value, data) {
                var item = [];
                item['value'] = value;
                item['data'] = data;
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
