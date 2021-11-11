<!-- Template -->
<template><span>{{ form.resourceCode }}</span></template>

<!-- Script -->
<script>
    
    // Module
    module.exports = {
        
        mixins: [require('../base')],
        
        data() {
            return {
                key: 'gmod-universal-workshop',
                name: 'Workshop Collection Generator',
                short: 'Workshop',
                game: 'gmod',
                mod: 'universal',
                language: 'lua',
                
                title: function(form) {
                    return form.collection;
                },
                
                categories: {
                    base: {
                        name: '<b>Collection</b> Configuration',
                        center: true,
                        inputs: {
                            collection: {
                                name: 'collection',
                                type: 'text',
                                label: 'CollectionID',
                                required: true,
                                placeholder: 'E.g. 140550510',
                                description: 'The collection that should be fetched for workshop items. <b>Click away from the input to generate the code.</b>',
                                updateMethod: 'change',
                                onChanged: function(value, self) {
                                    Bus.$emit('collection', [value, self]);
                                }
                            }
                        }
                    }
                },
                
                form: $.extend(true, new SparkForm({
                    collection: '',
                    resourceCode: ''
                }), this.form),
                
                pre: function() {
                    // Prepend
                    var prependCode = '';
                    prependCode += '-- Generated using: '+this.modDetails(this.game, this.mod).name+' | '+this.name;
                    prependCode += '\n-- '+window.location.href+'\n';
                    
                    // Return
                    return prependCode;
                },
                
                instructions: {
                    path: 'lua\\autorun\\server\\workshop.lua'
                }
            };
        },
        
        methods: {
            retrieveWorkshop(collection, funcSuccess, funcFailed) {
                return this.$http.post('/tools/'+this.key+'/proxy', {
                    'collection': collection
                }).then(
                    response => funcSuccess(response),
                    response => funcFailed(response)
                );
            }
        },
        
        created() {
            // Variables
            var vm = this;
            
            // collection
            Bus.$on('collection', function(list) {
                
                // Variables
                var value = list[0];
                var self = list[1];
                
                // Disable
                self.attr('disabled', true);
                vm.form.resourceCode = 'Loading...';
                
                // Retrieve
                vm.retrieveWorkshop(value, function(response) {
                    
                    // Variables
                    var items = $(response.data).find('[id*="sharedfile_"]');
                    
                    // Empty
                    if(items.length == 0) {
                        toastr.error('The collection is either empty or unavailable.');
                        self.attr('disabled', false);
                        vm.form.resourceCode = '';
                        return;
                    }
                    
                    // Matches
                    var code = '';
                    $.each(items, function(index, value) {
                        var el = $(value);
                        var elID = el.attr('id').replace(/[^0-9]/g, '');
                        var elName = el.find('[class="workshopItemTitle"]').text();
                        
                        code += 'resource.AddWorkshop("'+elID+'") -- '+elName;
                        code += '\n';
                    });
                    
                    // Code
                    vm.form.resourceCode = code;
                    
                    // Undisable
                    self.attr('disabled', false);
                    
                }, function() {
                    
                    // Error
                    toastr.error('Steam is currently unavailable. Try again later...');
                    self.attr('disabled', false);
                    vm.form.resourceCode = '';
                    
                });
                
            });
        }
        
    };
    
</script>