<!-- Template -->
<template><span>DarkRP.createAmmoType("{{ form.type }}", {
    name = "{{ form.name }}",
    model = "{{ form.model }}",
    price = {{ form.price }},
    amountGiven = {{ form.amount }}{{ outputs.category(this, form) }}{{ customCheck.template(form) }}
})</span></template>

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
                
                key: 'gmod-darkrp-ammo',
                name: 'Ammo Generator',
                short: 'Ammo',
                game: 'gmod',
                mod: 'darkrp',
                language: 'lua',
                
                title: function(form) {
                    return form.name;
                },
                
                outputs: {
                    category: function(vm, form) {
                        return vm.udefHide(form.category, function(value) {
                            return 'category = "'+value+'"';
                        }, true);
                    }
                },
                
                categories: {
                    base: {
                        name: '<b>Base</b> Configuration',
                        inputs: {
                            name: {
                                name: 'name',
                                type: 'text',
                                label: 'Name',
                                required: true,
                                placeholder: 'E.g. Rifle ammunition',
                                description: 'The name shown in the F4 menu.'
                            },
                            model: {
                                name: 'model',
                                type: 'text',
                                label: 'Model',
                                required: true,
                                placeholder: 'E.g. models/Items/BoxMRounds.mdl',
                                description: 'The model shown in the F4 menu and when bought.'
                            },
                            category: {
                                name: 'category',
                                type: 'text',
                                label: 'Category',
                                required: false,
                                placeholder: 'E.g. Printers',
                                description: 'The category the ammo type should show up in. (DarkRP 2.6+)'
                            }
                        }
                    },
                    ammo: {
                        name: '<b>Ammo</b> Configuration',
                        inputs: {
                            type: {
                                name: 'type',
                                type: 'ahead',
                                label: 'Type',
                                required: true,
                                placeholder: 'E.g. smg1',
                                description: 'Can be found in the weapon file (SWEP.Primary.Ammo, SWEP.Secondary.Ammo).',
                                engine: ['pistol', 'buckshot', 'smg1']
                            },
                            amount: {
                                name: 'amount',
                                type: 'number',
                                label: 'Bullets Given',
                                required: true,
                                placeholder: 'E.g. 24',
                                description: 'The amount of bullets given to the player.'
                            }
                        }
                    },
                    economy: {
                        name: '<b>Economy</b> Configuration',
                        inputs: {
                            price: {
                                name: 'price',
                                type: 'number',
                                label: 'Price',
                                required: true,
                                placeholder: 'E.g. 30',
                                description: 'The ammunition price.'
                            }
                        }
                    },
                    customcheck: sharedCheck.data
                },
                
                form: $.extend(true, new SparkForm({
                    type: '',
                    name: '',
                    model: '',
                    price: '',
                    amount: '',
                    category: ''
                }), this.form, sharedCheck.form),
                
                premade: {
                    pistol: {
                        title: 'Ammo - Pistol ammo',
                        form: {
                            name: 'Pistol ammo',
                            type: 'pistol',
                            name: 'Pistol ammo',
                            model: 'models/Items/BoxSRounds.mdl',
                            price: 30,
                            amount: 24,
                            category: null,
                            
                            customcheck: false, check_display: '', check_message: '',
                            check_type: '', check_jobs: '', check_admin: '', check_groups: '', check_steamids: ''
                        }
                    },
                    shotgun: {
                        title: 'Ammo - Shotgun ammo',
                        form: {
                            name: 'Shotgun ammo',
                            type: 'buckshot',
                            name: 'Shotgun ammo',
                            model: 'models/Items/BoxBuckshot.mdl',
                            price: 50,
                            amount: 8,
                            category: null,
                            
                            customcheck: false, check_display: '', check_message: '',
                            check_type: '', check_jobs: '', check_admin: '', check_groups: '', check_steamids: ''
                        }
                    },
                    rifle: {
                        title: 'Ammo - Rifle ammo',
                        form: {
                            name: 'Rifle ammo',
                            type: 'smg1',
                            name: 'Rifle ammo',
                            model: 'models/Items/BoxMRounds.mdl',
                            price: 80,
                            amount: 30,
                            category: null,
                            
                            customcheck: false, check_display: '', check_message: '',
                            check_type: '', check_jobs: '', check_admin: '', check_groups: '', check_steamids: ''
                        }
                    }
                },
                
                instructions: {
                    path: 'addons\\darkrpmodification\\lua\\darkrp_customthings\\ammo.lua'
                }
            };
        }
        
    };
    
</script>