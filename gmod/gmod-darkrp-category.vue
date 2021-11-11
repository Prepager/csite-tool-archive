<!-- Template -->
<template><span>DarkRP.createCategory{
    name = "{{ form.name }}",
    categorises = "{{ form.type }}",
    startExpanded = {{ form.expanded }},
    color = {{ form.color }},
    canSee = {{ outputs.canSee(this, form) }},
    sortOrder = {{ form.sort }}
}</span></template>

<!-- Script -->
<script>

    // Module
    module.exports = {
        
        mixins: [require('../base')],
        
        data() {
            return {
                key: 'gmod-darkrp-category',
                name: 'Category Generator',
                short: 'Category',
                game: 'gmod',
                mod: 'darkrp',
                language: 'lua',
                
                title: function(form) {
                    return form.name + ' ('+form.type+')';
                },
                
                outputs: {
                    canSee: function(vm, form) {
                        // Count
                        if(form.check_type == 'count') {
                            return 'fp{fn.Id, true}';
                        }
                        
                        // Switch
                        var returnValue = 'function(ply) return ';
                        switch (form.check_type) {
                            
                            // Everyone
                            case 'true':
                                returnValue += 'true';
                                break;
                            
                            // Groups
                            case 'groups':
                                returnValue += 'table.HasValue({'+vm.udef(form.check_groups)+'}, '+vm.udef(form.check_admin)+')';
                                break;
                            
                            // Jobs
                            case 'jobs':
                                returnValue += 'table.HasValue({'+vm.udef(form.check_jobs)+'}, ply:Team())';
                                break;
                            
                        }
                        returnValue += ' end'
                        
                        // Return
                        return returnValue;
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
                                placeholder: 'E.g. Printers',
                                description: 'The name shown on the category in the F4 menu.'
                            },
                            type: {
                                name: 'type',
                                type: 'select',
                                label: 'Type',
                                required: true,
                                description: 'The category type.',
                                options: {
                                    'jobs': 'Jobs',
                                    'entities': 'Entities',
                                    'shipments': 'Shipments',
                                    'weapons': 'Weapons',
                                    'vehicles': 'Vehicles',
                                    'ammo': 'Ammo'
                                }
                            }
                        }
                    },
                    category: {
                        name: '<b>Category</b> Configuration',
                        inputs: {
                            color: {
                                name: 'color',
                                type: 'color',
                                label: 'Color',
                                required: true,
                                placeholder: 'E.g. Color(255, 0, 0, 255)',
                                description: 'The color used for the category.',
                                onChange: this.luaColor,
                                onWatch: this.luaColorWatch
                            },
                            expanded: {
                                name: 'expanded',
                                type: 'select',
                                label: 'Expanded',
                                required: true,
                                description: 'The category initial expanded state.',
                                options: {
                                    'true': 'Yes, start expanded.',
                                    'false': 'No, start closed.'
                                }
                            },
                            sort: {
                                name: 'sort',
                                type: 'number',
                                label: 'Order',
                                required: true,
                                placeholder: 'E.g. 25',
                                description: 'The category position. The lower value the higher position.'
                            }
                        }
                    },
                    visibility: {
                        name: '<b>Visibility</b> Configuration',
                        inputs: {
                            check_type: {
                                name: 'check_type',
                                type: 'select',
                                label: 'Restriction',
                                required: true,
                                description: 'The restriction method you want to use.',
                                options: {
                                    'count': 'Item count > 1',
                                    'true': 'Everyone',
                                    'jobs': 'Jobs',
                                    'groups': 'Groups'
                                }
                            },
                            check_jobs: {
                                name: 'check_jobs',
                                type: 'token',
                                label: 'Jobs',
                                required: false,
                                placeholder: 'E.g. TEAM_CHIEF, TEAM_POLICE',
                                description: 'The teams the item should be restricted to.',
                                replacement: {
                                    quotes: false,
                                    spaces: false
                                },
                                engine: [
                                    'TEAM_CITIZEN', 'TEAM_POLICE', 'TEAM_GANG', 'TEAM_MOB', 'TEAM_GUN', 'TEAM_MEDIC', 'TEAM_CHIEF', 'TEAM_MAYOR', 'TEAM_HOBO', 'TEAM_COOK'
                                ],
                                active: function(form) {
                                    return form.check_type == 'jobs';
                                }
                            },
                            check_admin: {
                                name: 'check_admin',
                                type: 'select',
                                label: 'Admin System',
                                required: false,
                                description: 'The admin system you are running on your server.',
                                options: {
                                    'ply:GetNWString("usergroup")': 'ULX, FAdmin & More',
                                    'serverguard.player:GetRank(ply)': 'ServerGuard'
                                },
                                active: function(form) {
                                    return form.check_type == 'groups';
                                }
                            },
                            check_groups: {
                                name: 'check_groups',
                                type: 'token',
                                label: 'Groups',
                                required: false,
                                placeholder: 'E.g. "superadmin", "admin", "donator"',
                                description: 'The groups the item should be restricted to.',
                                replacement: {
                                    quotes: true,
                                    spaces: false
                                },
                                engine: [
                                    'superadmin', 'admin', 'operator'
                                ],
                                active: function(form) {
                                    return form.check_type == 'groups';
                                }
                            },
                        }
                    }
                },
                
                form: $.extend(true, new SparkForm({
                    name: '',
                    type: null,
                    color: '',
                    expanded: '',
                    sort: '',
                    
                    check_type: 'true',
                    check_jobs: null,
                    check_admin: null,
                    check_groups: null
                }), this.form),
                
                premade: {
                    entities: {
                        title: 'Category - Other (entities)',
                        form: {
                            name: 'Other',
                            type: 'entities',
                            color: 'Color(0, 107, 0, 255)',
                            expanded: 'true',
                            sort: '255',
                            
                            check_type: 'count',
                            check_jobs: null,
                            check_admin: null,
                            check_groups: null
                        }
                    },
                    shipments: {
                        title: 'Category - Other (shipments)',
                        form: {
                            name: 'Other',
                            type: 'shipments',
                            color: 'Color(0, 107, 0, 255)',
                            expanded: 'true',
                            sort: '255',
                            
                            check_type: 'count',
                            check_jobs: null,
                            check_admin: null,
                            check_groups: null
                        }
                    },
                    rifles: {
                        title: 'Category - Rifles (shipments)',
                        form: {
                            name: 'Rifles',
                            type: 'shipments',
                            color: 'Color(0, 107, 0, 255)',
                            expanded: 'true',
                            sort: '100',
                            
                            check_type: 'count',
                            check_jobs: null,
                            check_admin: null,
                            check_groups: null
                        }
                    },
                    shotguns: {
                        title: 'Category - Shotguns (shipments)',
                        form: {
                            name: 'Shotguns',
                            type: 'shipments',
                            color: 'Color(0, 107, 0, 255)',
                            expanded: 'true',
                            sort: '101',
                            
                            check_type: 'count',
                            check_jobs: null,
                            check_admin: null,
                            check_groups: null
                        }
                    },
                    snipers: {
                        title: 'Category - Snipers (shipments)',
                        form: {
                            name: 'Snipers',
                            type: 'shipments',
                            color: 'Color(0, 107, 0, 255)',
                            expanded: 'true',
                            sort: '102',
                            
                            check_type: 'count',
                            check_jobs: null,
                            check_admin: null,
                            check_groups: null
                        }
                    },
                    pistols: {
                        title: 'Category - Pistols (weapons)',
                        form: {
                            name: 'Pistols',
                            type: 'weapons',
                            color: 'Color(0, 107, 0, 255)',
                            expanded: 'true',
                            sort: '100',
                            
                            check_type: 'count',
                            check_jobs: null,
                            check_admin: null,
                            check_groups: null
                        }
                    },
                    weapons: {
                        title: 'Category - Other (weapons)',
                        form: {
                            name: 'Other',
                            type: 'weapons',
                            color: 'Color(0, 107, 0, 255)',
                            expanded: 'true',
                            sort: '255',
                            
                            check_type: 'count',
                            check_jobs: null,
                            check_admin: null,
                            check_groups: null
                        }
                    },
                    vehicles: {
                        title: 'Category - Other (vehicles)',
                        form: {
                            name: 'Other',
                            type: 'vehicles',
                            color: 'Color(0, 107, 0, 255)',
                            expanded: 'true',
                            sort: '255',
                            
                            check_type: 'count',
                            check_jobs: null,
                            check_admin: null,
                            check_groups: null
                        }
                    }
                },
                
                instructions: {
                    path: 'addons\\darkrpmodification\\lua\\darkrp_customthings\\categories.lua'
                }
            };
        }
        
    };
    
</script>