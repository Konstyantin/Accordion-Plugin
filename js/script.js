/**
 * Created by kostya on 24.01.17.
 */

;(function ($, undefined) {

    /**
     * @param method
     */
    $.fn.accordionPlugin = function (method) {

        /**
         * Default options
         * @type {{duration: number}}
         */
        var defaults = { duration: 300 };

        /**
         * Base plugin methods
         * @type {{init: init, duration: duration}}
         */
        var methods = {

            /**
             * Initialization plugin
             * @param params
             * @returns {methods}
             */
            init: function(params) {

                /**
                 * Override defaults options
                 */
                var options = $.extend({}, defaults, params);

                if ( !this.data('accordion') ) {

                    this.data('accordion', options);

                    var trig_btn = $(this).find('.accordion-trigger');

                    /**
                     * AddEvent click
                     */
                    trig_btn.on('click.accordion', function(e){
                        e.preventDefault();

                        var that = $(this),
                            item = that.closest('.accordion-item'),
                            list = that.closest('.accordion-list'),
                            items = list.find('.accordion-item'),
                            content = item.find('.accordion-inner'),
                            otherContent = list.find('.accordion-inner');

                        /**
                         * Redefine class active
                         */
                        if ( !item.hasClass('active') ) {
                            items.removeClass('active');
                            item.addClass('active');

                            otherContent.stop(true, true).slideUp(options.duration);
                            content.stop(true, true).slideDown(options.duration);
                        } else {
                            content.stop(true, true).slideUp(options.duration);
                            item.removeClass('active');
                        }
                    });
                }
                return this;
            },

            /**
             * Duration method which define duration animation
             * @param duration
             */
            duration: function(duration) {
                var options = $(this).data('accordion');
                options.duration = duration;
                $(this).data('accordion', options);
            }
        };

        /**
         * Catch method plugin
         */
        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error('Method ' + method + 'no exists');
        }
    };

    /**
     * Implement plugin Accordion
     */
    $('.accordion').accordionPlugin({ duration: 100});

})(jQuery);
