<!-- Template -->
<template><span>DarkRP.createShipment("{{ form.name }}", {
    model = "{{ form.model }}",
    entity = "{{ form.entity }}",
    amount = {{ (form.type == 'shipment' || form.type == 'both' ? form.amount : '10') }},
    price = {{ (form.type == 'shipment' || form.type == 'both' ? form.price : form.pricesep) }},
    separate = {{ (form.type == 'weapon' || form.type == 'both' ? 'true' : 'false') }},
    pricesep = {{ (form.type == 'weapon' || form.type == 'both' ? form.pricesep : '0') }},
    noship = {{ (form.type == 'weapon' ? 'true' : 'false') }}{{ outputs.category(this, form) }}{{ outputs.allowed(this, form) }}{{ customCheck.template(form) }}
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
                
                key: 'gmod-darkrp-shipment',
                name: 'Shipment Generator',
                short: 'Shipment',
                game: 'gmod',
                mod: 'darkrp',
                language: 'lua',
                
                title: function(form) {
                    return form.name + ' ('+form.type+')';
                },
                
                outputs: {
                    category: function(vm, form) {
                        return vm.udefHide(form.category, function(value) {
                            return 'category = "'+value+'"';
                        }, true);
                    },
                    allowed: function(vm, form) {
                        return vm.udefHide(form.allowed, function(value) {
                            return 'allowed = {'+value+'}';
                        }, true);
                    },
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
                                placeholder: 'E.g. AK-47',
                                description: 'The name shown in the F4 menu.'
                            },
                            model: {
                                name: 'model',
                                type: 'text',
                                label: 'Model',
                                required: true,
                                placeholder: 'E.g. models/weapons/w_rif_ak47.mdl',
                                description: 'The model shown in the F4 menu and when bought.'
                            },
                            category: {
                                name: 'category',
                                type: 'text',
                                label: 'Category',
                                required: false,
                                placeholder: 'E.g. Automatic rifles',
                                description: 'The category the shipment/weapon should show up in. (DarkRP 2.6+)'
                            }
                        }
                    },
                    entity: {
                        name: '<b>Entity</b> Configuration',
                        inputs: {
                            entity: {
                                name: 'entity',
                                type: 'text',
                                label: 'Entity',
                                required: true,
                                placeholder: 'E.g. weapon_ak472',
                                description: 'The weapon entity. Can be found in the Q menu under weapons.'
                            }
                        }
                    },
                    type: {
                        name: '<b>Type</b> Configuration',
                        inputs: {
                            type: {
                                name: 'type',
                                type: 'select',
                                label: 'Type',
                                required: true,
                                description: 'The sales type used for the item. Shipment, single or both.',
                                options: {
                                    'shipment': 'Shipment',
                                    'weapon': 'Single weapon',
                                    'both': 'Both shipment and single weapon.'
                                }
                            },
                            price: {
                                name: 'price',
                                type: 'number',
                                label: 'Price',
                                required: function(form) {
                                    return (form.type == 'shipment' || form.type == 'both');
                                },
                                placeholder: 'E.g. 2500',
                                description: 'The shipment price.',
                                active: function(form) {
                                    return (form.type == 'shipment' || form.type == 'both');
                                }
                            },
                            amount: {
                                name: 'amount',
                                type: 'number',
                                label: 'Amount',
                                required: function(form) {
                                    return (form.type == 'shipment' || form.type == 'both');
                                },
                                placeholder: 'E.g. 10',
                                description: 'The amount of weapons there should be in the snipment.',
                                active: function(form) {
                                    return (form.type == 'shipment' || form.type == 'both');
                                }
                            },
                            pricesep: {
                                name: 'pricesep',
                                type: 'number',
                                label: 'Price',
                                required: function(form) {
                                    return (form.type == 'weapon' || form.type == 'both');
                                },
                                placeholder: 'E.g. 250',
                                description: 'The single weapon price.',
                                active: function(form) {
                                    return (form.type == 'weapon' || form.type == 'both');
                                }
                            }
                        }
                    },
                    team: {
                        name: '<b>Team</b> Configuration',
                        inputs: {
                            allowed: {
                                name: 'allowed',
                                type: 'token',
                                label: 'Allowed',
                                required: false,
                                placeholder: 'E.g. TEAM_CHIEF, TEAM_POLICE',
                                description: 'The jobs that should have access to purchase the entity.',
                                replacement: {
                                    quotes: false,
                                    spaces: false
                                },
                                engine: [
                                    'TEAM_CITIZEN', 'TEAM_POLICE', 'TEAM_GANG', 'TEAM_MOB', 'TEAM_GUN', 'TEAM_MEDIC', 'TEAM_CHIEF', 'TEAM_MAYOR', 'TEAM_HOBO', 'TEAM_COOK'
                                ]
                            }
                        }
                    },
                    customcheck: sharedCheck.data
                },
                
                form: $.extend(true, new SparkForm({
                    name: '',
                    model: '',
                    category: '',
                    entity: '',
                    type: '',
                    price: '',
                    amount: '',
                    pricesep: '',
                    allowed: '',
                    
                    customcheck: false
                }), this.form, sharedCheck.form),
                
                premade: {
                    desert: {
                        title: 'Shipment - Desert eagle (weapon)',
                        form: {
                            name: 'Desert eagle',
                            model: 'models/weapons/w_pist_deagle.mdl',
                            category: 'Pistols',
                            entity: 'weapon_deagle2',
                            type: 'weapon',
                            price: '215',
                            amount: '10',
                            pricesep: '215',
                            allowed: 'TEAM_GUN',
                            
                            customcheck: false, check_display: '', check_message: '',
                            check_type: '', check_jobs: '', check_admin: '', check_groups: '', check_steamids: ''
                        }
                    },
                    fiveseven: {
                        title: 'Shipment - Fiveseven (weapon)',
                        form: {
                            name: 'Fiveseven',
                            model: 'models/weapons/w_pist_fiveseven.mdl',
                            category: 'Pistols',
                            entity: 'weapon_fiveseven2',
                            type: 'weapon',
                            price: '205',
                            amount: '10',
                            pricesep: '205',
                            allowed: 'TEAM_GUN',
                            
                            customcheck: false, check_display: '', check_message: '',
                            check_type: '', check_jobs: '', check_admin: '', check_groups: '', check_steamids: ''
                        }
                    },
                    glock: {
                        title: 'Shipment - Glock (weapon)',
                        form: {
                            name: 'Glock',
                            model: 'models/weapons/w_pist_glock18.mdl',
                            category: 'Pistols',
                            entity: 'weapon_glock2',
                            type: 'weapon',
                            price: '160',
                            amount: '10',
                            pricesep: '160',
                            allowed: 'TEAM_GUN',
                            
                            customcheck: false, check_display: '', check_message: '',
                            check_type: '', check_jobs: '', check_admin: '', check_groups: '', check_steamids: ''
                        }
                    },
                    p228: {
                        title: 'Shipment - P228 (weapon)',
                        form: {
                            name: 'P228',
                            model: 'models/weapons/w_pist_p228.mdl',
                            category: 'Pistols',
                            entity: 'weapon_p2282',
                            type: 'weapon',
                            price: '185',
                            amount: '10',
                            pricesep: '185',
                            allowed: 'TEAM_GUN',
                            
                            customcheck: false, check_display: '', check_message: '',
                            check_type: '', check_jobs: '', check_admin: '', check_groups: '', check_steamids: ''
                        }
                    },
                    ak47: {
                        title: 'Shipment - AK47 (shipment)',
                        form: {
                            name: 'AK47',
                            model: 'models/weapons/w_rif_ak47.mdl',
                            category: 'Rifles',
                            entity: 'weapon_ak472',
                            type: 'shipment',
                            price: '2450',
                            amount: '10',
                            pricesep: '0',
                            allowed: 'TEAM_GUN',
                            
                            customcheck: false, check_display: '', check_message: '',
                            check_type: '', check_jobs: '', check_admin: '', check_groups: '', check_steamids: ''
                        }
                    },
                    mp5: {
                        title: 'Shipment - MP5 (shipment)',
                        form: {
                            name: 'MP5',
                            model: 'models/weapons/w_smg_mp5.mdl',
                            category: 'Rifles',
                            entity: 'weapon_mp52',
                            type: 'shipment',
                            price: '2200',
                            amount: '10',
                            pricesep: '0',
                            allowed: 'TEAM_GUN',
                            
                            customcheck: false, check_display: '', check_message: '',
                            check_type: '', check_jobs: '', check_admin: '', check_groups: '', check_steamids: ''
                        }
                    },
                    m4: {
                        title: 'Shipment - M4 (shipment)',
                        form: {
                            name: 'M4',
                            model: 'models/weapons/w_rif_m4a1.mdl',
                            category: 'Rifles',
                            entity: 'weapon_m42',
                            type: 'shipment',
                            price: '2450',
                            amount: '10',
                            pricesep: '0',
                            allowed: 'TEAM_GUN',
                            
                            customcheck: false, check_display: '', check_message: '',
                            check_type: '', check_jobs: '', check_admin: '', check_groups: '', check_steamids: ''
                        }
                    },
                    mac10: {
                        title: 'Shipment - Mac 10 (shipment)',
                        form: {
                            name: 'Mac 10',
                            model: 'models/weapons/w_smg_mac10.mdl',
                            category: '',
                            entity: 'weapon_mac102',
                            type: 'shipment',
                            price: '2150',
                            amount: '10',
                            pricesep: '0',
                            allowed: 'TEAM_GUN',
                            
                            customcheck: false, check_display: '', check_message: '',
                            check_type: '', check_jobs: '', check_admin: '', check_groups: '', check_steamids: ''
                        }
                    },
                    shotgun: {
                        title: 'Shipment - Pump shotgun (shipment)',
                        form: {
                            name: 'Pump shotgun',
                            model: 'models/weapons/w_shot_m3super90.mdl',
                            category: 'Shotguns',
                            entity: 'weapon_pumpshotgun2',
                            type: 'shipment',
                            price: '1750',
                            amount: '10',
                            pricesep: '0',
                            allowed: 'TEAM_GUN',
                            
                            customcheck: false, check_display: '', check_message: '',
                            check_type: '', check_jobs: '', check_admin: '', check_groups: '', check_steamids: ''
                        }
                    },
                    sniper: {
                        title: 'Shipment - Sniper rifle (shipment)',
                        form: {
                            name: 'Sniper rifle',
                            model: 'models/weapons/w_snip_g3sg1.mdl',
                            category: 'Snipers',
                            entity: 'ls_sniper',
                            type: 'shipment',
                            price: '3750',
                            amount: '10',
                            pricesep: '0',
                            allowed: 'TEAM_GUN',
                            
                            customcheck: false, check_display: '', check_message: '',
                            check_type: '', check_jobs: '', check_admin: '', check_groups: '', check_steamids: ''
                        }
                    }
                },
                
                instructions: {
                    path: 'addons\\darkrpmodification\\lua\\darkrp_customthings\\shipments.lua'
                }
            };
        }
        
    };
    
</script>