/**
 * SAHILIITEMSLIDER 
 *
 *
 * VERSION 0.2.0
 *
 *
 * CAHNGELOG
 * 
 * VERSION 1.0
 * - ADDED: ITEM HANDLER
 * - ADDED: CALLBACKS
 *     - addItem
 *     - deleteSingleItems
 *     - deleteAllItems
 *     - getItemLength
 * - ADDED: CORE
 *
 *
 * author Dominik Matt <mail@matt-dominik.at>
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
            lastIndexCallback: 0,
            
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
                sis.lastIndexCallback = null;
            },
            
            /*
             * call this function to reload the items in the slider
             */
            reloadItemSlider: function()
            {
                sis.clearSlider();
                setTimeout(function() {
                    if(sis.activeItem >= sis.helper.getItemLength()) {
                        if(sis.helper.getItemLength() == 0) {
                            sis.activeItem = 0;
                        } else {
                            sis.activeItem = sis.helper.getItemLength()-1;
                        }
                        console.log(sis.activeItem);
                        sis.slideToIndex(sis.activeItem);
                    }    
                }, 100);
                
                sis.setItems();
                sis.setContainerWidth();
                sis.helper.hideNavOnStart();
            },
            
            setContainerWidth: function() 
            {
                var width = sis.helper.getItemLength()*100;
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
                if(sis.helper.getItemLength() > index) {
                    var element = $slider.find('li.item-' + index);
                    
                    
                    if(sis.lastIndexCallback != index) {
                        //fire callback event before slide is start
                        options.startSlide(index, element);
                    }
                    
                    sis.activeItem = index;
                    var marginLeft = -(sis.itemLength*index);
                    $slider.find('ul').stop().animate({
                        'marginLeft': marginLeft + 'px'
                    }, 500, function() {
                        if(sis.lastIndexCallback != index) {
                            //fire event after the slide is done
                            options.slideEnded(index, element);
                        }
                    });
                    sis.lastIndexCallback = index;
                }
                sis.checkPagination();
            },
            
            checkPagination: function() 
            {
                
                sis.helper.show($slider.find('.next'));
                sis.helper.show($slider.find('.prev'));

                if(sis.helper.getItemLength() <= options.showItems) {
                    sis.helper.hide($slider.find('.next'));
                    sis.helper.hide($slider.find('.prev'));
                }
                
                if(sis.helper.getItemLength() <= (sis.activeItem+options.showItems)) {
                   sis.helper.hide($slider.find('.next'));  
                }

                if(sis.activeItem <= 0) {
                    sis.helper.hide($slider.find('.prev'));
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
                if(sis.helper.getItemLength() > (sis.activeItem+options.showItems)) { 
                    var index = sis.activeItem+1;
                    sis.slideToIndex(index);
                } 
            },
            
            deleteAllItems: function() {
                sis.items = [];
                sis.reloadItemSlider();
            }
        };
        
        /*
        * HELPER 
        */
        sis.helper = {
            hide: function($element)
            {
                $element.stop().animate({
                    opacity: 0
                }, 400);
            },
            
            show: function($element)
            {
                $element.stop().animate({
                    opacity: 1
                }, 400);
            },
            
            hideNavOnStart: function() 
            {
                //$slider.find('.next').hide();
                if(sis.activeItem == 0) {
                    $slider.stop().find('.prev').css({
                        opacity: 0
                    });    
                } else {
                    $slider.stop().find('.prev').css({
                        opacity: 1
                    });  
                }
                
                if(sis.activeItem == sis.helper.getItemLength()) {
                    $slider.stop().find('.next').css({
                        opacity: 0
                    });  
                } else {
                    $slider.stop().find('.next').css({
                        opacity: 1
                    });  
                }
            },
            
            getItemLength: function() 
            {
                return parseInt(sis.items.length);
            }
        }
        
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
            },
            
            getItemLength: function() {
                return sis.helper.getItemLength();
            }
        };
        
        return actions;
    };
    
    return new sisClass($(this));
    
};
