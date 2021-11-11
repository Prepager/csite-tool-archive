<!-- Template -->
<template><span>{{ checkTemplate(form) }}</span></template>

<!-- Script -->
<script>

    // Shared
    var sharedCheck = require('./_gmod-customcheck');
    
    // Module
    module.exports = {
        
        mixins: [require('../base')],
        
        data() {
            return {
                customCheck: sharedCheck,
                
                key: 'gmod-darkrp-customcheck',
                name: 'Custom Check Generator',
                short: 'CustomCheck',
                game: 'gmod',
                mod: 'darkrp',
                language: 'lua',
                
                title: function(form) {
                    return form.check_type;
                },
                
                outputs: {
                    //
                },
                
                categories: {
                    //customcheck: sharedCheck.data
                    customcheck: $.extend(true, sharedCheck.data, {
                        center: true,
                        hiddenKey: null
                    })
                },
                
                form: $.extend(true, new SparkForm({
                    //
                }), this.form, sharedCheck.form, {
                    customcheck: true
                }),
                
                premade: {
                    //
                },
                
                instructions: {
                    //
                }
            };
        },
        
        mounted() {
            //
        },
        
        methods: {
            // checkTemplate
            checkTemplate(form) {
                // Template
                var tab = '    ';
                var template = this.customCheck.template(form);
                
                // Line
                template = template.split('\n').slice(1);
                
                // Spaces
                $.each(template, function(key, value) {
                    template[key] = value.replace(tab, '');
                });
                
                // Join
                template = template.join('\n');
                
                // Return
                return template;
            }
        }
        
    };
    
</script>