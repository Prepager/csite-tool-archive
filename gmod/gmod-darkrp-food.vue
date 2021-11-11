<!-- Template -->
<template><span>DarkRP.createFood("{{ form.name }}", {
    model = "{{ form.model }}",
    energy = {{ form.energy }},
    price = {{ form.price }}{{ customCheck.template(form) }}
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
                
                key: 'gmod-darkrp-food',
                name: 'Food Generator',
                short: 'Food',
                game: 'gmod',
                mod: 'darkrp',
                language: 'lua',
                
                title: function(form) {
                    return form.name;
                },
                
                outputs: {
                    //
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
                                placeholder: 'E.g. Banana',
                                description: 'The name shown in the F4 menu.'
                            },
                            model: {
                                name: 'model',
                                type: 'text',
                                label: 'Model',
                                required: true,
                                placeholder: 'E.g. models/props/cs_italy/bananna.mdl',
                                description: 'The model shown in the F4 menu and when bought.'
                            }
                        }
                    },
                    hunger: {
                        name: '<b>Hunger</b> Configuration',
                        inputs: {
                            energy: {
                                name: 'energy',
                                type: 'number',
                                label: 'Energy',
                                required: true,
                                placeholder: 'E.g. 20',
                                description: 'The amount of energy/hunger the player should receive.'
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
                                placeholder: 'E.g. 50',
                                description: 'The food price.'
                            }
                        }
                    },
                    customcheck: sharedCheck.data
                },
                
                form: $.extend(true, new SparkForm({
                    name: '',
                    model: '',
                    energy: '',
                    price: ''
                }), this.form, sharedCheck.form),
                
                premade: {
                    banana: {
                        title: 'Food - Banana',
                        form: {
                            name: 'Banana',
                            model: 'models/props/cs_italy/bananna.mdl',
                            energy: 10,
                            price: 10
                        }
                    },
                    bunch: {
                        title: 'Food - Bunch of bananas',
                        form: {
                            name: 'Bunch of bananas',
                            model: 'models/props/cs_italy/bananna_bunch.mdl',
                            energy: 20,
                            price: 20
                        }
                    },
                    melon: {
                        title: 'Food - Melon',
                        form: {
                            name: 'Melon',
                            model: 'models/props_junk/watermelon01.mdl',
                            energy: 20,
                            price: 20
                        }
                    },
                    glass: {
                        title: 'Food - Glass bottle',
                        form: {
                            name: 'Glass bottle',
                            model: 'models/props_junk/GlassBottle01a.mdl',
                            energy: 20,
                            price: 20
                        }
                    },
                    pop: {
                        title: 'Food - Pop can',
                        form: {
                            name: 'Pop can',
                            model: 'models/props_junk/PopCan01a.mdl',
                            energy: 5,
                            price: 5
                        }
                    },
                    plastic: {
                        title: 'Food - Plastic bottle',
                        form: {
                            name: 'Plastic bottle',
                            model: 'models/props_junk/garbage_plasticbottle003a.mdl',
                            energy: 15,
                            price: 15
                        }
                    },
                    milk: {
                        title: 'Food - Milk',
                        form: {
                            name: 'Milk',
                            model: 'models/props_junk/garbage_milkcarton002a.mdl',
                            energy: 20,
                            price: 20
                        }
                    },
                    bottle1: {
                        title: 'Food - Bottle 1',
                        form: {
                            name: 'Bottle 1',
                            model: 'models/props_junk/garbage_glassbottle001a.mdl',
                            energy: 10,
                            price: 10
                        }
                    },
                    bottle2: {
                        title: 'Food - Bottle 2',
                        form: {
                            name: 'Bottle 2',
                            model: 'models/props_junk/garbage_glassbottle002a.mdl',
                            energy: 10,
                            price: 10
                        }
                    },
                    bottle3: {
                        title: 'Food - Bottle 3',
                        form: {
                            name: 'Bottle 3',
                            model: 'models/props_junk/garbage_glassbottle003a.mdl',
                            energy: 10,
                            price: 10
                        }
                    },
                    orange: {
                        title: 'Food - Orange',
                        form: {
                            name: 'Orange',
                            model: 'models/props/cs_italy/orange.mdl',
                            energy: 20,
                            price: 20
                        }
                    }
                },
                
                instructions: {
                    path: 'addons\\darkrpmodification\\lua\\darkrp_customthings\\food.lua'
                }
            };
        }
        
    };
    
</script>