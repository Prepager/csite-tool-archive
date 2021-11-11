<!-- Template -->
<template><span>{{ form.teamid }} = DarkRP.createJob("{{ form.name }}", {
    color = {{ form.color }},
    model = {{ curlyList(form.model, true) }},
    description = [[{{ form.description }}]],
    weapons = {{ curlyList(form.weapon) }},
    command = "{{ form.command }}",
    max = {{ form.max }},
    salary = {{ form.salary }},
    admin = {{ form.admin }},
    vote = {{ form.vote }},
    hasLicense = {{ form.license }},
    candemote = {{ form.demote }}{{ outputs.category(this, form) }}{{ outputs.types(this, form) }}{{ outputs.change(this, form) }}{{ outputs.ammo(this, form) }}{{ outputs.spawn(this, form) }}{{ outputs.death(this, form) }}{{ customCheck.template(form) }}
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
                
                key: 'gmod-darkrp-job',
                name: 'Job Generator',
                short: 'Job',
                game: 'gmod',
                mod: 'darkrp',
                language: 'lua',
                
                title: function(form) {
                    return form.name;
                },
                
                outputs: {
                    category: function(vm, form) {
                        // Return
                        return vm.udefHide(form.category, function(value) {
                            return 'category = "'+value+'"';
                        }, true);
                    },
                    change: function(vm, form) {
                        // Return
                        return vm.udefHide(form.change, function(value) {
                            return 'NeedToChangeFrom = '+value+'';
                        }, true);
                    },
                    types: function(vm, form) {
                        // Value
                        var returnValue = '';
                        if(!form.typeselection) { return ''; }
                        $.each(['mayor', 'chief', 'medic', 'cook', 'hobo'], function(key, value) {
                            if(form[value] == 'true') {
                                returnValue += ',\n    '+value+' = true';
                            }
                        });
                        
                        // Return
                        return returnValue;
                    },
                    spawn: function(vm, form) {
                        // Variables
                        var tab = '    ';
                        var returnValue = ',\n'+tab+'PlayerSpawn = function(ply)';
                        var values = [form.health, form.armor, form.bodygroupGroup, form.bodygroupValue];
                        
                        // Missing
                        if(vm.udef(values[0]) == '' && vm.udef(values[1]) == '' && vm.udef(values[2]) == '' && vm.udef(values[3]) == '') {
                            return '';
                        }
                        
                        // Value
                        if(vm.udef(values[0]) != '') {
                            returnValue += '\n'+tab+tab+'ply:SetMaxHealth('+values[0]+')';
                            returnValue += '\n'+tab+tab+'ply:SetHealth('+values[0]+')';
                        }
                        if(vm.udef(values[1]) != '') {
                            returnValue += '\n'+tab+tab+'ply:SetArmor('+values[1]+')';
                        }
                        
                        // Bodygroups
                        var groupVal = vm.udef(form.bodygroupValue).split(',');
                        $.each(vm.udef(form.bodygroupGroup).split(','), function(key, value) {
                            if(!groupVal[key]) { return; }
                            returnValue += '\n'+tab+tab+'ply:SetBodygroup('+value.trim()+', '+groupVal[key].trim()+')';
                        });
                        
                        // Return
                        returnValue += '\n'+tab+'end'
                        return returnValue;
                    },
                    ammo: function(vm, form) {
                        // Variables
                        var tab = '    ';
                        var returnValue = ',\n'+tab+'ammo = {';
                        
                        // Missing
                        if(vm.udef(form.ammoType) == '') {
                            return '';
                        }
                        
                        // Types
                        var amount = vm.udef(form.ammoAmount).split(',');
                        $.each(vm.udef(form.ammoType).split(','), function(key, value) {
                            if(key != 0) { returnValue += ','; }
                            returnValue += '\n'+tab+tab+'['+value.replace(/\s/g, '')+'] = '+(form.ammoAmount && amount[key] ? amount[key] : '0')
                        });
                        
                        // Return
                        returnValue += '\n'+tab+'}';
                        return returnValue;
                    },
                    death: function(vm, form) {
                        // Variables
                        var tab = '    ';
                        var returnValue = ',\n'+tab+'PlayerDeath = function(ply, weapon, killer)';
                        
                        // Missing
                        if(!form.otherselection || vm.udef(form.deathDemote) != 'true') {
                            return '';
                        }
                        
                        // Death
                        returnValue += '\n'+tab+tab+'ply:teamBan()';
                        returnValue += '\n'+tab+tab+'ply:changeTeam(GAMEMODE.DefaultTeam, true)';
                        
                        // Message
                        returnValue += '\n'+tab+tab+'DarkRP.notifyAll(0, 4, "'+vm.udef(form.demoteMessage)+'")';
                        
                        // Return
                        returnValue += '\n'+tab+'end';
                        return returnValue;
                    }
                },
                
                categories: {
                    base: {
                        name: '<b>Base</b> Configuration',
                        inputs: {
                            teamid: {
                                name: 'teamid',
                                type: 'text',
                                label: 'TeamID',
                                required: true,
                                placeholder: 'E.g. TEAM_CITIZEN',
                                description: 'The ID used to identify the job in the code.',
                                replacement: {
                                    quotes: false,
                                    spaces: false
                                }
                            },
                            name: {
                                name: 'name',
                                type: 'text',
                                label: 'Name',
                                required: true,
                                placeholder: 'E.g. Citizen',
                                description: 'The name shown on the F4 menu, Scoreboard, HUD and such.'
                            },
                            model: {
                                name: 'model',
                                type: 'token',
                                label: 'Model',
                                required: true,
                                placeholder: 'E.g. models/player/group01/male_01.mdl',
                                description: 'The model shown on the F4 menu and used when changed. <a href="/tools/gmod-universal-mdl" target="_blank">Playermodel List</a>.',
                                replacement: {
                                    quotes: true,
                                    spaces: false
                                }
                            },
                            category: {
                                name: 'category',
                                type: 'text',
                                label: 'Category',
                                required: false,
                                placeholder: 'E.g. Citizens',
                                description: '(DarkRP 2.6+) The category the job should show up in. You must create the category. You can use our generator here: <a href="/tools/gmod-darkrp-category" target="_blank">Category Generator</a>'
                            }
                        }
                    },
                    job: {
                        name: '<b>Job</b> Configuration',
                        inputs: {
                            color: {
                                name: 'color',
                                type: 'color',
                                label: 'Color',
                                required: true,
                                placeholder: 'E.g. Color(20, 150, 20, 255)',
                                description: 'The color used for the job in the F4 menu, HUD and such.',
                                onChange: this.luaColor,
                                onWatch: this.luaColorWatch
                            },
                            description: {
                                name: 'description',
                                type: 'area',
                                label: 'Description',
                                required: true,
                                placeholder: 'E.g. The Citizen is the most basic level of society you can hold besides being a hobo. You have no specific role in city life.',
                                description: 'The description shown in the F4 menu to give an overview of the job.'
                            },
                            command: {
                                name: 'command',
                                type: 'text',
                                label: 'Command',
                                required: true,
                                placeholder: 'E.g. citizen',
                                description: 'The chat command used to change to the job (without the \'/\').'
                            },
                            weapon: {
                                name: 'weapon',
                                type: 'token',
                                label: 'Weapons',
                                required: false,
                                placeholder: 'E.g. "weapon_ak472", "weapon_m42"',
                                description: 'The weapons the job should spawn with.',
                                replacement: {
                                    quotes: true,
                                    spaces: false
                                },
                                engine: ['arrest_stick', 'unarrest_stick', 'door_ram', 'lockpick', 'ls_sniper', 'med_kit', 'stunstick', 'weapon_ak472', 'weapon_deagle2', 'weapon_fiveseven2', 'weapon_glock2', 'eapon_keypadchecker', 'weapon_m42', 'weapon_mac102', 'weapon_mp52', 'weapon_p2282', 'weapon_pumpshotgun2', 'weaponchecker']
                            },
                            change: {
                                name: 'change',
                                type: 'text',
                                label: 'Change',
                                required: false,
                                placeholder: 'E.g. TEAM_POLICE',
                                description: 'The job the player must change from to become the new job.',
                                replacement: {
                                    quotes: false,
                                    spaces: false
                                }
                            }
                        }
                    },
                    permission: {
                        name: '<b>Permission</b> Configuration',
                        inputs: {
                            admin: {
                                name: 'admin',
                                type: 'select',
                                label: 'Access',
                                required: true,
                                description: 'The admin status required for the job. CustomChecks may work better in some situations and got more options.',
                                options: {
                                    '0': 'Everyone.',
                                    '1': 'Admin and higher.',
                                    '2': 'Superadmin and higher.'
                                }
                            },
                            vote: {
                                name: 'vote',
                                type: 'select',
                                label: 'Vote',
                                required: true,
                                description: 'Whether or not a vote should be required to become the job.',
                                options: {
                                    'true': 'Yes, require vote.',
                                    'false': 'No, don\'t required vote.'
                                }
                            },
                            license: {
                                name: 'license',
                                type: 'select',
                                label: 'License',
                                required: true,
                                description: 'Whether or not the job should spawn with a gun license.',
                                options: {
                                    'true': 'Yes, spawn with license.',
                                    'false': 'No, don\'t spawn with license.'
                                }
                            },
                            demote: {
                                name: 'demote',
                                type: 'select',
                                label: 'Demote',
                                required: true,
                                description: 'Whether or not the job can be demoted by other players.',
                                options: {
                                    'true': 'Yes, allow demoted.',
                                    'false': 'No, don\'t allow demoted.'
                                }
                            }
                        }
                    },
                    economy: {
                        name: '<b>Economy</b> Configuration',
                        inputs: {
                            salary: {
                                name: 'salary',
                                type: 'text',
                                label: 'Salary',
                                required: true,
                                placeholder: 'E.g. 250',
                                description: 'The salary the player receive.'
                            },
                            max: {
                                name: 'max',
                                type: 'number',
                                label: 'Max',
                                required: true,
                                placeholder: 'E.g. 2',
                                description: 'The amount of players that can have the job at the same time. Unlimited: 0.'
                            }
                        }
                    },
                    spawn: {
                        name: '<b>Spawn</b> Configuration <small>(Health, Armor, Bodygroups and Ammo)</small>',
                        inputs: {
                            health: {
                                name: 'health',
                                type: 'number',
                                label: 'Health',
                                required: false,
                                placeholder: 'E.g. 150',
                                description: 'The amount of health the job should spawn with. <b>This may not be compatible with all addons such as HUDs.</b>'
                            },
                            armor: {
                                name: 'armor',
                                type: 'number',
                                label: 'Armor',
                                required: false,
                                placeholder: 'E.g. 150',
                                description: 'The amount of armor the job should spawn with.'
                            },
                            sep1: {
                                type: 'seperator'
                            },
                            bodygroupGroup: {
                                name: 'bodygroupGroup',
                                type: 'token',
                                label: 'Bodygroup Group',
                                required: false,
                                placeholder: 'E.g. 0, 1, 2',
                                description: 'The position of the group in the C right click menu (Start at 0). <b>Must match with the value below.</b>',
                                replacement: {
                                    quotes: false,
                                    spaces: false
                                }
                            },
                            bodygroupValue: {
                                name: 'bodygroupValue',
                                type: 'token',
                                label: 'Bodygroup Value',
                                required: false,
                                placeholder: 'E.g. 2, 6, 1',
                                description: 'The position of the bodygroup value in the C right click menu (Start at 0). <b>Must match with the group above.</b>',
                                replacement: {
                                    quotes: false,
                                    spaces: false
                                }
                            },
                            sep2: {
                                type: 'seperator'
                            },
                            ammoType: {
                                name: 'ammoType',
                                type: 'token',
                                label: 'Ammo Types',
                                required: false,
                                placeholder: 'E.g. "pistol", "buckshot"',
                                description: 'The ammo types the job should spawn with. <b>Must match with the numbers below.</b>',
                                replacement: {
                                    quotes: true,
                                    spaces: false
                                },
                                engine: ['pistol', 'buckshot', 'smg1']
                            },
                            ammoAmount: {
                                name: 'ammoAmount',
                                type: 'token',
                                label: 'Ammo Amount',
                                required: false,
                                placeholder: 'E.g. 20, 50',
                                description: 'The amount of ammo the job should spawn with. <b>Must match with the names above.</b>',
                                replacement: {
                                    quotes: false,
                                    spaces: false
                                }
                            }
                        },
                        hiddenKey: 'spawnselection'
                    },
                    customcheck: sharedCheck.data,
                    type: {
                        name: '<b>Type</b> Configuration <small>(Mayor, Medic etc.)</small>',
                        inputs: {
                            mayor: {
                                name: 'mayor',
                                type: 'select',
                                label: 'Mayor',
                                required: false,
                                description: 'Gives access to lockdown, lottery, broadcast and more.',
                                options: {'true': 'Yes.', 'false': 'No.'}
                            },
                            chief: {
                                name: 'chief',
                                type: 'select',
                                label: 'Chief',
                                required: false,
                                description: 'Gives access to jail positions.',
                                options: {'true': 'Yes.', 'false': 'No.'}
                            },
                            medic: {
                                name: 'medic',
                                type: 'select',
                                label: 'Medic',
                                required: false,
                                description: 'Gives access to nothing. External addons may use this.',
                                options: {'true': 'Yes.', 'false': 'No.'}
                            },
                            cook: {
                                name: 'cook',
                                type: 'select',
                                label: 'Cook',
                                required: false,
                                description: 'Gives access to food and the microwave.',
                                options: {'true': 'Yes.', 'false': 'No.'}
                            },
                            hobo: {
                                name: 'hobo',
                                type: 'select',
                                label: 'Hobo',
                                required: false,
                                description: 'Gives access to nothing. External addons may use this.',
                                options: {'true': 'Yes.', 'false': 'No.'}
                            },
                        },
                        hiddenKey: 'typeselection'
                    },
                    other: {
                        name: '<b>Other</b> Configuration <small>(Demote on Death)</small>',
                        inputs: {
                            deathDemote: {
                                name: 'deathDemote',
                                type: 'select',
                                label: 'Demote on Death',
                                required: false,
                                description: 'Whether or not the player should be demoted on death.',
                                options: {'true': 'Yes, demote on death.', 'false': 'No, don\'t demote on death.'}
                            },
                            demoteMessage: {
                                name: 'demoteMessage',
                                type: 'text',
                                label: 'Demote Message',
                                required: false,
                                placeholder: 'E.g. The mayor died and was therefore demoted.',
                                description: 'The message it should display when the player is demoted.'
                            }
                        },
                        hiddenKey: 'otherselection'
                    }
                },
                
                form: $.extend(true, new SparkForm({
                    teamid: '',
                    name: '',
                    model: '',
                    category: '',
                    color: '',
                    description: '',
                    command: '',
                    weapon: '',
                    change: '',
                    admin: '',
                    vote: '',
                    license: '',
                    demote: '',
                    salary: '',
                    max: '',
                    health: '', armor: '',
                    bodygroupGroup: '', bodygroupValue: '',
                    ammoType: '', ammoAmount: '',
                    mayor: '', chief: '', medic: '', cook: '', hobo: '',
                    deathDemote: '', demoteMessage: '',
                    
                    spawnselection: false,
                    typeselection: false,
                    otherselection: false,
                    customcheck: false
                }), this.form, sharedCheck.form),
                
                premade: {
                    citizen: {
                        title: 'Job - Citizen',
                        form: {
                            teamid: 'TEAM_CITIZEN',
                            change: '',
                            name: 'Citizen',
                            model: '"models/player/Group01/Female_01.mdl", "models/player/Group01/Female_02.mdl", "models/player/Group01/Female_03.mdl", "models/player/Group01/Female_04.mdl", "models/player/Group01/Female_06.mdl", "models/player/group01/male_01.mdl", "models/player/Group01/Male_02.mdl", "models/player/Group01/male_03.mdl", "models/player/Group01/Male_04.mdl", "models/player/Group01/Male_05.mdl", "models/player/Group01/Male_06.mdl", "models/player/Group01/Male_07.mdl", "models/player/Group01/Male_08.mdl", "models/player/Group01/Male_09.mdl"',
                            category: 'Citizens',
                            color: 'Color(20, 150, 20, 255)',
                            description: 'The Citizen is the most basic level of society you can hold besides being a hobo. You have no specific role in city life.',
                            command: 'citizen',
                            weapon: '',
                            admin: '0',
                            vote: 'false',
                            license: 'false',
                            demote: 'false',
                            salary: '45',
                            max: '0',
                            health: '', armor: '',
                            ammoType: '', ammoAmount: '',
                            mayor: '', chief: '', medic: '', cook: '', hobo: '',
                            deathDemote: '', demoteMessage: '',
                            
                            spawnselection: false,
                            typeselection: false,
                            otherselection: false,
                            
                            customcheck: false, check_display: '', check_message: '',
                            check_type: '', check_jobs: '', check_admin: '', check_groups: '', check_steamids: ''
                        }
                    },
                    police: {
                        title: 'Job - Civil Protection',
                        form: {
                            teamid: 'TEAM_POLICE',
                            change: '',
                            name: 'Civil Protection',
                            model: '"models/player/police.mdl", "models/player/police_fem.mdl"',
                            category: 'Civil Protection',
                            color: 'Color(25, 25, 170, 255)',
                            description: 'The protector of every citizen that lives in the city. You have the power to arrest criminals and protect innocents. Hit a player with your arrest baton to put them in jail. Bash a player with a stunstick and they may learn to obey the law. The Battering Ram can break down the door of a criminal, with a warrant for their arrest. The Battering Ram can also unfreeze frozen props (if enabled). Type /wanted <name> to alert the public to the presence of a criminal.',
                            command: 'cp',
                            weapon: '"arrest_stick", "unarrest_stick", "weapon_glock2", "stunstick", "door_ram", "weaponchecker"',
                            admin: '0',
                            vote: 'true',
                            license: 'true',
                            demote: 'true',
                            salary: '65',
                            max: '4',
                            health: '', armor: '',
                            ammoType: '"pistol"', ammoAmount: '60',
                            mayor: '', chief: '', medic: '', cook: '', hobo: '',
                            deathDemote: '', demoteMessage: '',
                            
                            spawnselection: false,
                            typeselection: false,
                            otherselection: false,
                            
                            customcheck: false, check_display: '', check_message: '',
                            check_type: '', check_jobs: '', check_admin: '', check_groups: '', check_steamids: ''
                        }
                    },
                    gang: {
                        title: 'Job - Gangster',
                        form: {
                            teamid: 'TEAM_GANG',
                            change: '',
                            name: 'Gangster',
                            model: '"models/player/Group03/Female_01.mdl", "models/player/Group03/Female_02.mdl", "models/player/Group03/Female_03.mdl", "models/player/Group03/Female_04.mdl", "models/player/Group03/Female_06.mdl", "models/player/group03/male_01.mdl", "models/player/Group03/Male_02.mdl", "models/player/Group03/male_03.mdl", "models/player/Group03/Male_04.mdl", "models/player/Group03/Male_05.mdl", "models/player/Group03/Male_06.mdl", "models/player/Group03/Male_07.mdl", "models/player/Group03/Male_08.mdl", "models/player/Group03/Male_09.mdl"',
                            category: 'Gangsters',
                            color: 'Color(75, 75, 75, 255)',
                            description: 'The lowest person of crime. A gangster generally works for the Mobboss who runs the crime family. The Mob boss sets your agenda and you follow it or you might be punished.',
                            command: 'gangster',
                            weapon: '',
                            admin: '0',
                            vote: 'false',
                            license: 'false',
                            demote: 'true',
                            salary: '45',
                            max: '3',
                            health: '', armor: '',
                            ammoType: '', ammoAmount: '',
                            mayor: '', chief: '', medic: '', cook: '', hobo: '',
                            deathDemote: '', demoteMessage: '',
                            
                            spawnselection: false,
                            typeselection: false,
                            otherselection: false,
                            
                            customcheck: false, check_display: '', check_message: '',
                            check_type: '', check_jobs: '', check_admin: '', check_groups: '', check_steamids: ''
                        }
                    },
                    mob: {
                        title: 'Job - Mob boss',
                        form: {
                            teamid: 'TEAM_MOB',
                            change: '',
                            name: 'Mob boss',
                            model: '"models/player/gman_high.mdl"',
                            category: 'Gangsters',
                            color: 'Color(25, 25, 25,, 255)',
                            description: 'The Mob boss is the boss of the criminals in the city. With his power he coordinates the gangsters and forms an efficient crime organization. He has the ability to break into houses by using a lockpick. The Mob boss posesses the ability to unarrest you.',
                            command: 'mobboss',
                            weapon: '',
                            admin: '0',
                            vote: 'false',
                            license: 'false',
                            demote: 'true',
                            salary: '60',
                            max: '1',
                            health: '', armor: '',
                            ammoType: '', ammoAmount: '',
                            mayor: '', chief: '', medic: '', cook: '', hobo: '',
                            deathDemote: '', demoteMessage: '',
                            
                            spawnselection: false,
                            typeselection: false,
                            otherselection: false,
                            
                            customcheck: false, check_display: '', check_message: '',
                            check_type: '', check_jobs: '', check_admin: '', check_groups: '', check_steamids: ''
                        }
                    },
                    gun: {
                        title: 'Job - Gun Dealer',
                        form: {
                            teamid: 'TEAM_GUN',
                            change: '',
                            name: 'Gun Dealer',
                            model: '"models/player/monk.mdl"',
                            category: 'Citizens',
                            color: 'Color(255, 140, 0, 255)',
                            description: 'A Gun Dealer is the only person who can sell guns to other people. Make sure you aren\'t caught selling illegal firearms to the public! You might get arrested!',
                            command: 'gundealer',
                            weapon: '',
                            admin: '0',
                            vote: 'false',
                            license: 'false',
                            demote: 'true',
                            salary: '45',
                            max: '2',
                            health: '', armor: '',
                            ammoType: '', ammoAmount: '',
                            mayor: '', chief: '', medic: '', cook: '', hobo: '',
                            deathDemote: '', demoteMessage: '',
                            
                            spawnselection: false,
                            typeselection: false,
                            otherselection: false,
                            
                            customcheck: false, check_display: '', check_message: '',
                            check_type: '', check_jobs: '', check_admin: '', check_groups: '', check_steamids: ''
                        }
                    },
                    medic: {
                        title: 'Job - Medic',
                        form: {
                            teamid: 'TEAM_MEDIC',
                            change: '',
                            name: 'Medic',
                            model: '"models/player/kleiner.mdl"',
                            category: 'Citizens',
                            color: 'Color(47, 79, 79, 255)',
                            description: 'With your medical knowledge you work to restore players to full health. Without a medic, people cannot be healed. Left click with the Medical Kit to heal other players. Right click with the Medical Kit to heal yourself.',
                            command: 'medic',
                            weapon: '"med_kit"',
                            admin: '0',
                            vote: 'false',
                            license: 'false',
                            demote: 'true',
                            salary: '45',
                            max: '3',
                            health: '', armor: '',
                            ammoType: '', ammoAmount: '',
                            mayor: '', chief: '', medic: 'true', cook: '', hobo: '',
                            deathDemote: '', demoteMessage: '',
                            
                            spawnselection: false,
                            typeselection: true,
                            otherselection: false,
                            
                            customcheck: false, check_display: '', check_message: '',
                            check_type: '', check_jobs: '', check_admin: '', check_groups: '', check_steamids: ''
                        }
                    },
                    chief: {
                        title: 'Job - Civil Protection Chief',
                        form: {
                            teamid: 'TEAM_CHIEF',
                            change: 'TEAM_POLICE',
                            name: 'Civil Protection Chief',
                            model: '"models/player/combine_soldier_prisonguard.mdl"',
                            category: 'Civil Protection',
                            color: 'Color(20, 20, 255, 255)',
                            description: 'The Chief is the leader of the Civil Protection unit. Coordinate the police force to enforce law in the city. Hit a player with arrest baton to put them in jail. Bash a player with a stunstick and they may learn to obey the law. The Battering Ram can break down the door of a criminal, with a warrant for his/her arrest. Type /wanted <name> to alert the public to the presence of a criminal. Type /jailpos to set the Jail Position',
                            command: 'chief',
                            weapon: '"arrest_stick", "unarrest_stick", "weapon_deagle2", "stunstick", "door_ram", "weaponchecker"',
                            admin: '0',
                            vote: 'false',
                            license: 'true',
                            demote: 'true',
                            salary: '75',
                            max: '0',
                            health: '', armor: '',
                            ammoType: '"pistol"', ammoAmount: '60',
                            mayor: '', chief: 'true', medic: '', cook: '', hobo: '',
                            deathDemote: '', demoteMessage: '',
                            
                            spawnselection: false,
                            typeselection: true,
                            otherselection: false,
                            
                            customcheck: false, check_display: '', check_message: '',
                            check_type: '', check_jobs: '', check_admin: '', check_groups: '', check_steamids: ''
                        }
                    },
                    mayor: {
                        title: 'Job - Mayor',
                        form: {
                            teamid: 'TEAM_MAYOR',
                            change: '',
                            name: 'Mayor',
                            model: '"models/player/breen.mdl"',
                            category: 'Civil Protection',
                            color: 'Color(150, 20, 20, 255)',
                            description: 'The Mayor of the city creates laws to govern the city. If you are the mayor you may create and accept warrants. Type /wanted <name> to warrant a player. Type /jailpos to set the Jail Position. Type /lockdown initiate a lockdown of the city. Everyone must be inside during a lockdown. The cops patrol the area. /unlockdown to end a lockdown',
                            command: 'mayor',
                            weapon: '',
                            admin: '0',
                            vote: 'true',
                            license: 'false',
                            demote: 'true',
                            salary: '85',
                            max: '1',
                            health: '', armor: '',
                            ammoType: '', ammoAmount: '',
                            mayor: 'true', chief: '', medic: '', cook: '', hobo: '',
                            deathDemote: '', demoteMessage: '',
                            
                            spawnselection: false,
                            typeselection: true,
                            otherselection: false,
                            
                            customcheck: false, check_display: '', check_message: '',
                            check_type: '', check_jobs: '', check_admin: '', check_groups: '', check_steamids: ''
                        }
                    },
                    hobo: {
                        title: 'Job - Hobo',
                        form: {
                            teamid: 'TEAM_HOBO',
                            change: '',
                            name: 'Hobo',
                            model: '"models/player/corpse1.mdl"',
                            category: 'Citizens',
                            color: 'Color(80, 45, 0, 255)',
                            description: 'The lowest member of society. Everybody laughs at you. You have no home. Beg for your food and money Sing for everyone who passes to get money Make your own wooden home somewhere in a corner or outside someone else\'s door',
                            command: 'hobo',
                            weapon: '"weapon_bugbait"',
                            admin: '0',
                            vote: 'false',
                            license: 'false',
                            demote: 'false',
                            salary: '0',
                            max: '5',
                            health: '', armor: '',
                            ammoType: '', ammoAmount: '',
                            mayor: '', chief: '', medic: '', cook: '', hobo: 'true',
                            deathDemote: '', demoteMessage: '',
                            
                            spawnselection: false,
                            typeselection: true,
                            otherselection: false,
                            
                            customcheck: false, check_display: '', check_message: '',
                            check_type: '', check_jobs: '', check_admin: '', check_groups: '', check_steamids: ''
                        }
                    },
                    cook: {
                        title: 'Job - Cook',
                        form: {
                            teamid: 'TEAM_COOK',
                            change: '',
                            name: 'Cook',
                            model: '"models/player/mossman.mdl"',
                            category: 'Citizens',
                            color: 'Color(238, 99, 99, 255)',
                            description: 'As a cook, it is your responsibility to feed the other members of your city. You can spawn a microwave and sell the food you make: /buymicrowave',
                            command: 'cook',
                            weapon: '',
                            admin: '0',
                            vote: 'false',
                            license: 'false',
                            demote: 'true',
                            salary: '45',
                            max: '2',
                            health: '', armor: '',
                            ammoType: '', ammoAmount: '',
                            mayor: '', chief: '', medic: '', cook: 'true', hobo: '',
                            deathDemote: '', demoteMessage: '',
                            
                            spawnselection: false,
                            typeselection: true,
                            otherselection: false,
                            
                            customcheck: false, check_display: '', check_message: '',
                            check_type: '', check_jobs: '', check_admin: '', check_groups: '', check_steamids: ''
                        }
                    }
                },
                
                instructions: {
                    path: 'addons\\darkrpmodification\\lua\\darkrp_customthings\\jobs.lua'
                }
            };
        }
        
    };
    
</script>