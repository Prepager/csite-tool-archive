<!-- Template -->
<template><span>// Base Configuration
hostname "{{ form.hostname }}"
sv_password "{{ form.password }}"
rcon_password "{{ form.rcon }}"

// Network Configuration
sv_loadingurl "{{ form.loadingurl }}"
sv_downloadurl "{{ (form.downloadmethod == 'fastdl' ? form.downloadurl : '') }}"
sv_allowdownload {{ (form.downloadmethod == 'fastdl' ? 0 : 1) }}
sv_allowupload {{ form.allowupload }}
net_maxfilesize {{ form.maxfilesize }}

// Logging Configuration
log {{ form.log }}
sv_logbans {{ form.logbans }}
sv_logecho {{ form.logecho }}
sv_logfile {{ form.logfile }}
sv_log_onefile {{ form.log_onefile }}

// Sandbox Configuration
sbox_noclip {{ form.noclip }}
sbox_godmode {{ form.godmode }}
sbox_playershurtplayers {{ form.pvp }}
sbox_maxprops {{ form.props }}
sbox_maxragdolls {{ form.ragdolls }}
sbox_maxnpcs {{ form.npcs }}
sbox_maxballoons {{ form.balloons }}
sbox_maxeffects {{ form.effects }}
sbox_maxdynamite {{ form.dynamite }}
sbox_maxlamps {{ form.lamps }}
sbox_maxthrusters {{ form.thrusters }}
sbox_maxwheels {{ form.wheels }}
sbox_maxhoverballs {{ form.hoverballs }}
sbox_maxvehicles {{ form.vehicles }}
sbox_maxbuttons {{ form.buttons }}
sbox_maxemitters {{ form.emitters }}

// Exec Bans
exec banned_user.cfg
exec banned_ip.cfg</span></template>

<!-- Script -->
<script>

    // Module
    module.exports = {
        
        mixins: [require('../base')],
        
        data() {
            return {
                key: 'gmod-universal-cfg',
                name: 'Server.cfg Generator',
                short: 'ServerCFG',
                game: 'gmod',
                mod: 'universal',
                language: 'lua',
                
                title: function(form) {
                    return form.hostname;
                },
                
                pre: function() {
                    return '// Generated using: '+this.modDetails(this.game, this.mod).name+' | '+this.name+'\n' +
                    '// '+window.location.href+'\n\n';
                },
                
                outputs: {
                    //
                },
                
                categories: {
                    base: {
                        name: '<b>Base</b> Configuration',
                        inputs: {
                            hostname: {
                                name: 'hostname',
                                type: 'text',
                                label: 'Hostname',
                                required: true,
                                placeholder: 'E.g. MyCommunity DarkRP #1',
                                description: 'The name of the server.'
                            },
                            basesep1: {
                                type: 'seperator'
                            },
                            password: {
                                name: 'password',
                                type: 'text',
                                label: 'sv_password',
                                required: false,
                                placeholder: 'E.g. MySecurePassword1',
                                description: 'The password the players need to use to be able to join the server.'
                            },
                            rcon: {
                                name: 'rcon',
                                type: 'text',
                                label: 'rcon_password',
                                required: false,
                                placeholder: 'E.g. MySecurePassword2',
                                description: 'The rcon password that can be used to make changes to the server settings.'
                            }
                        }
                    },
                    sandbox: {
                        name: '<b>Sandbox</b> Configuration',
                        inputs: {
                            noclip: {
                                name: 'noclip',
                                type: 'select',
                                label: 'sbox_noclip',
                                required: true,
                                description: 'Whether or not noclip should be allowed for normal users.',
                                options: {
                                    '1': '1 - Enable noclip.',
                                    '0': '0 - Disable noclip.'
                                }
                            },
                            godmode: {
                                name: 'godmode',
                                type: 'select',
                                label: 'sbox_godmode',
                                required: true,
                                description: 'Whether or not godmode should be enabled by default for normal users.',
                                options: {
                                    '1': '1 - Enable godmode.',
                                    '0': '0 - Disable godmode.'
                                }
                            },
                            pvp: {
                                name: 'pvp',
                                type: 'select',
                                label: 'sbox_playershurtplayers',
                                required: true,
                                description: 'Whether or not players should be able to hurt each other.',
                                options: {
                                    '1': '1 - Enable PVP.',
                                    '0': '0 - Disable PVP.'
                                }
                            },
                            sboxsep1: {
                                type: 'seperator'
                            },
                            props: {
                                name: 'props',
                                type: 'number',
                                label: 'sbox_maxprops',
                                required: true,
                                description: 'The max amount of props a player should be able to spawn.'
                            },
                            ragdolls: {
                                name: 'ragdolls',
                                type: 'number',
                                label: 'sbox_maxragdolls',
                                required: true,
                                description: 'The max amount of ragdolls a player should be able to spawn.'
                            },
                            npcs: {
                                name: 'npcs',
                                type: 'number',
                                label: 'sbox_maxnpcs',
                                required: true,
                                description: 'The max amount of npcs a player should be able to spawn.'
                            },
                            balloons: {
                                name: 'balloons',
                                type: 'number',
                                label: 'sbox_maxballoons',
                                required: true,
                                description: 'The max amount of balloons a player should be able to spawn.'
                            },
                            effects: {
                                name: 'effects',
                                type: 'number',
                                label: 'sbox_maxeffects',
                                required: true,
                                description: 'The max amount of effects a player should be able to spawn.'
                            },
                            dynamite: {
                                name: 'dynamite',
                                type: 'number',
                                label: 'sbox_maxdynamite',
                                required: true,
                                description: 'The max amount of dynamite a player should be able to spawn.'
                            },
                            lamps: {
                                name: 'lamps',
                                type: 'number',
                                label: 'sbox_maxlamps',
                                required: true,
                                description: 'The max amount of lamps a player should be able to spawn.'
                            },
                            thrusters: {
                                name: 'thrusters',
                                type: 'number',
                                label: 'sbox_maxthrusters',
                                required: true,
                                description: 'The max amount of thrusters a player should be able to spawn.'
                            },
                            wheels: {
                                name: 'wheels',
                                type: 'number',
                                label: 'sbox_maxwheels',
                                required: true,
                                description: 'The max amount of wheels a player should be able to spawn.'
                            },
                            hoverballs: {
                                name: 'hoverballs',
                                type: 'number',
                                label: 'sbox_maxhoverballs',
                                required: true,
                                description: 'The max amount of hoverballs a player should be able to spawn.'
                            },
                            vehicles: {
                                name: 'vehicles',
                                type: 'number',
                                label: 'sbox_maxvehicles',
                                required: true,
                                description: 'The max amount of vehicles a player should be able to spawn.'
                            },
                            buttons: {
                                name: 'buttons',
                                type: 'number',
                                label: 'sbox_maxbuttons',
                                required: true,
                                description: 'The max amount of buttons a player should be able to spawn.'
                            },
                            emitters: {
                                name: 'emitters',
                                type: 'number',
                                label: 'sbox_maxemitters',
                                required: true,
                                description: 'The max amount of emitters a player should be able to spawn.'
                            },
                        }
                    },
                    network: {
                        name: '<b>Network</b> Configuration',
                        inputs: {
                            loadingurl: {
                                name: 'loadingurl',
                                type: 'text',
                                label: 'sv_loadingurl',
                                required: false,
                                placeholder: 'E.g. https://www.mycommunity.com/loading.html',
                                description: 'The URL that should be shown to players while loading.'
                            },
                            netsep1: {
                                type: 'seperator'
                            },
                            downloadmethod: {
                                name: 'downloadmethod',
                                type: 'select',
                                label: 'Download method',
                                required: true,
                                description: 'The download method that should be used when transfering required files.',
                                options: {
                                    'fastdl': 'FastDL (Require extensive setup).',
                                    'server': 'Direct server download (Previously exploited).'
                                }
                            },
                            downloadurl: {
                                name: 'downloadurl',
                                type: 'text',
                                label: 'sv_downloadurl',
                                required: false,
                                placeholder: 'E.g. https://www.mycommunity.com/fastdl',
                                description: 'The URL that should be used to download required files from.',
                                active: function(form) {
                                    return form.downloadmethod == 'fastdl';
                                }
                            },
                            maxfilesize: {
                                name: 'maxfilesize',
                                type: 'number',
                                label: 'net_maxfilesize',
                                required: true,
                                placeholder: 'E.g. 64',
                                description: 'The max file size (MB) that can be downloaded from the server. Max: 64MB',
                                active: function(form) {
                                    return form.downloadmethod == 'server';
                                }
                            },
                            allowupload: {
                                name: 'allowupload',
                                type: 'select',
                                label: 'sv_allowupload',
                                required: true,
                                description: 'Whether or not players should be able to upload files (Sprays and stuff) to the server.',
                                options: {
                                    '1': '1 - Allow upload (Previously exploited).',
                                    '0': '0 - Disallow upload (Recommended)'
                                }
                            }
                        }
                    },
                    logging: {
                        name: '<b>Logging</b> Configuration',
                        inputs: {
                            log: {
                                name: 'log',
                                type: 'select',
                                label: 'log',
                                required: true,
                                description: 'Whether or not the server should be using logs.',
                                options: {
                                    'on': 'On - Enable logging.',
                                    'off': 'Off - Disable logging.'
                                }
                            },
                            logsep1: {
                                type: 'seperator'
                            },
                            logbans: {
                                name: 'logbans',
                                type: 'select',
                                label: 'sv_logbans',
                                required: true,
                                description: 'Whether or not bans should be logged.',
                                options: {
                                    '1': '1 - Log bans.',
                                    '0': '0 - Don\'t log bans.'
                                }
                            },
                            logecho: {
                                name: 'logecho',
                                type: 'select',
                                label: 'sv_logecho',
                                required: true,
                                description: 'Whether or not log info should be sent to the server console.',
                                options: {
                                    '1': '1 - Echo logs.',
                                    '0': '0 - Don\'t echo logs.'
                                }
                            },
                            logfile: {
                                name: 'logfile',
                                type: 'select',
                                label: 'sv_logfile',
                                required: true,
                                description: 'Whether or not logs should be saved in log files.',
                                options: {
                                    '1': '1 - Save logs.',
                                    '0': '0 - Don\'t save logs.'
                                }
                            },
                            log_onefile: {
                                name: 'log_onefile',
                                type: 'select',
                                label: 'sv_log_onefile',
                                required: true,
                                description: 'Whether or not logs should be saved to only a single file.',
                                options: {
                                    '1': '1 - Save to single file.',
                                    '0': '0 - Save to multiple files.'
                                }
                            }
                        }
                    }
                },
                
                form: $.extend(true, new SparkForm({
                    // Base
                    hostname: '',
                    password: '',
                    rcon: '',
                    
                    // Network
                    loadingurl: '',
                    downloadmethod: 'server',
                    downloadurl: '',
                    maxfilesize: '64',
                    allowupload: '0',
                    
                    // Logging
                    log: 'on',
                    logbans: '0',
                    logecho: '0',
                    logfile: '1',
                    log_onefile: '0',
                    
                    // Sandbox
                    noclip: '0',
                    godmode: '0',
                    pvp: '1',
                    
                    props: '150',
                    ragdolls: '6',
                    npcs: '0',
                    balloons: '6',
                    effects: '6',
                    dynamite: '0',
                    lamps: '6',
                    thrusters: '6',
                    wheels: '6',
                    hoverballs: '6',
                    vehicles: '0',
                    buttons: '10',
                    emitters: '0'
                }), this.form),
                
                premade: {
                    //
                },
                
                instructions: {
                    path: 'cfg\\server.lua'
                }
            };
        }
        
    };
    
</script>