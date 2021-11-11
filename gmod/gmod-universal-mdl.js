// Export
module.exports = {
    
    // Mounted
    mounted() {
        
        // Tooltip
        var tip = $('.btn-mdl-copy').tooltip({
            placement: 'bottom',
            trigger: 'manual',
            title: 'Copied!'
        });
        
        // Clipboard
        var clipboard = new Clipboard('.btn-mdl-copy', {
            text: function(trigger) {
                
                // Tooltip
                $(trigger).tooltip('show');
                setTimeout(function() {
                    $(trigger).tooltip('hide');
                }, 1000);
                
                // Return
                return $(trigger).closest('div').find('input').val();
                
            }
        });
        
    },
    
    // Data
    data() {
        return {
            
            list: {
                
                alyx: { player: 'models/player/alyx.mdl', image: 'alyx.png' },
                barney: { player: 'models/player/barney.mdl', image: 'barney.png' },
                breen: { player: 'models/player/breen.mdl', image: 'breen.png' },
                chell: { player: 'models/player/p2_chell.mdl', image: 'chell.png' },
                eli: { player: 'models/player/eli.mdl', image: 'eli.png' },
                gman: { player: 'models/player/gman_high.mdl', image: 'gman.png' },
                kleiner: { player: 'models/player/kleiner.mdl', image: 'kleiner.png' },
                monk: { player: 'models/player/monk.mdl', image: 'monk.png' },
                mossman: { player: 'models/player/mossman.mdl', image: 'mossman.png' },
                mossmanarctic: { player: 'models/player/mossman_arctic.mdl', image: 'mossmanarctic.png' },
                odessa: { player: 'models/player/odessa.mdl', image: 'odessa.png' },
                magnusson: { player: 'models/player/magnusson.mdl', image: 'magnusson.png' },
                
                police: { player: 'models/player/police.mdl', image: 'police.png' },
                policefem: { player: 'models/player/police_fem.mdl', image: 'policefem.png' },
                combine: { player: 'models/player/combine_soldier.mdl', image: 'combine.png' },
                combineelite: { player: 'models/player/combine_super_soldier.mdl', image: 'combineelite.png' },
                combineprison: { player: 'models/player/combine_soldier_prisonguard.mdl', image: 'combineprison.png' },
                
                stripped: { player: 'models/player/soldier_stripped.mdl', image: 'stripped.png' },
                corpse: { player: 'models/player/corpse1.mdl', image: 'corpse.png' },
                charple: { player: 'models/player/charple.mdl', image: 'charple.png' },
                skeleton: { player: 'models/player/skeleton.mdl', image: 'skeleton.png' },
                zombie: { player: 'models/player/zombie_classic.mdl', image: 'zombie.png' },
                zombiefast: { player: 'models/player/zombie_fast.mdl', image: 'zombiefast.png' },
                zombine: { player: 'models/player/zombie_soldier.mdl', image: 'zombine.png' },
                
                female01: { player: 'models/player/Group01/female_01.mdl', image: 'female01.png' },
                female02: { player: 'models/player/Group01/female_02.mdl', image: 'female02.png' },
                female03: { player: 'models/player/Group01/female_03.mdl', image: 'female03.png' },
                female04: { player: 'models/player/Group01/female_04.mdl', image: 'female04.png' },
                female05: { player: 'models/player/Group01/female_05.mdl', image: 'female05.png' },
                female06: { player: 'models/player/Group01/female_06.mdl', image: 'female06.png' },
                
                female07: { player: 'models/player/Group03/female_01.mdl', image: 'female07.png' },
                female08: { player: 'models/player/Group03/female_02.mdl', image: 'female08.png' },
                female09: { player: 'models/player/Group03/female_03.mdl', image: 'female09.png' },
                female10: { player: 'models/player/Group03/female_04.mdl', image: 'female10.png' },
                female11: { player: 'models/player/Group03/female_05.mdl', image: 'female11.png' },
                female12: { player: 'models/player/Group03/female_06.mdl', image: 'female12.png' },
                
                medic10: { player: 'models/player/Group03m/female_01.mdl', image: 'medic10.png' },
                medic11: { player: 'models/player/Group03m/female_02.mdl', image: 'medic11.png' },
                medic12: { player: 'models/player/Group03m/female_03.mdl', image: 'medic12.png' },
                medic13: { player: 'models/player/Group03m/female_04.mdl', image: 'medic13.png' },
                medic14: { player: 'models/player/Group03m/female_05.mdl', image: 'medic14.png' },
                medic15: { player: 'models/player/Group03m/female_06.mdl', image: 'medic15.png' },
                
                male01: { player: 'models/player/Group01/male_01.mdl', image: 'male01.png' },
                male02: { player: 'models/player/Group01/male_02.mdl', image: 'male02.png' },
                male03: { player: 'models/player/Group01/male_03.mdl', image: 'male03.png' },
                male04: { player: 'models/player/Group01/male_04.mdl', image: 'male04.png' },
                male05: { player: 'models/player/Group01/male_05.mdl', image: 'male05.png' },
                male06: { player: 'models/player/Group01/male_06.mdl', image: 'male06.png' },
                male07: { player: 'models/player/Group01/male_07.mdl', image: 'male07.png' },
                male08: { player: 'models/player/Group01/male_08.mdl', image: 'male08.png' },
                male09: { player: 'models/player/Group01/male_09.mdl', image: 'male09.png' },
                
                refugee01: { player: 'models/player/Group02/male_02.mdl', image: 'refugee01.png' },
                refugee02: { player: 'models/player/Group02/male_04.mdl', image: 'refugee02.png' },
                refugee03: { player: 'models/player/Group02/male_06.mdl', image: 'refugee03.png' },
                refugee04: { player: 'models/player/Group02/male_08.mdl', image: 'refugee04.png' },
                
                male10: { player: 'models/player/Group03/male_01.mdl', image: 'male10.png' },
                male11: { player: 'models/player/Group03/male_02.mdl', image: 'male11.png' },
                male12: { player: 'models/player/Group03/male_03.mdl', image: 'male12.png' },
                male13: { player: 'models/player/Group03/male_04.mdl', image: 'male13.png' },
                male14: { player: 'models/player/Group03/male_05.mdl', image: 'male14.png' },
                male15: { player: 'models/player/Group03/male_06.mdl', image: 'male15.png' },
                male16: { player: 'models/player/Group03/male_07.mdl', image: 'male16.png' },
                male17: { player: 'models/player/Group03/male_08.mdl', image: 'male17.png' },
                male18: { player: 'models/player/Group03/male_09.mdl', image: 'male18.png' },
                
                medic01: { player: 'models/player/Group03m/male_01.mdl', image: 'medic01.png' },
                medic02: { player: 'models/player/Group03m/male_02.mdl', image: 'medic02.png' },
                medic03: { player: 'models/player/Group03m/male_03.mdl', image: 'medic03.png' },
                medic04: { player: 'models/player/Group03m/male_04.mdl', image: 'medic04.png' },
                medic05: { player: 'models/player/Group03m/male_05.mdl', image: 'medic05.png' },
                medic06: { player: 'models/player/Group03m/male_06.mdl', image: 'medic06.png' },
                medic07: { player: 'models/player/Group03m/male_07.mdl', image: 'medic07.png' },
                medic08: { player: 'models/player/Group03m/male_08.mdl', image: 'medic08.png' },
                medic09: { player: 'models/player/Group03m/male_09.mdl', image: 'medic09.png' },
                
                hostage01: { player: 'models/player/hostage/hostage_01.mdl', image: 'hostage01.png' },
                hostage02: { player: 'models/player/hostage/hostage_02.mdl', image: 'hostage02.png' },
                hostage03: { player: 'models/player/hostage/hostage_03.mdl', image: 'hostage03.png' },
                hostage04: { player: 'models/player/hostage/hostage_04.mdl', image: 'hostage04.png' },
                
                css_arctic: { player: 'models/player/arctic.mdl', image: 'css_arctic.png' },
                css_gasmask: { player: 'models/player/gasmask.mdl', image: 'css_gasmask.png' },
                css_guerilla: { player: 'models/player/guerilla.mdl', image: 'css_guerilla.png' },
                css_leet: { player: 'models/player/leet.mdl', image: 'css_leet.png' },
                css_phoenix: { player: 'models/player/phoenix.mdl', image: 'css_phoenix.png' },
                css_riot: { player: 'models/player/riot.mdl', image: 'css_riot.png' },
                css_swat: { player: 'models/player/swat.mdl', image: 'css_swat.png' },
                css_urban: { player: 'models/player/urban.mdl', image: 'css_urban.png' },
                
                dod_american: { player: 'models/player/dod_american.mdl', image: 'dod_american.png' },
                dod_german: { player: 'models/player/dod_german.mdl', image: 'dod_german.png' },
                
            }
            
        }
    }
    
};