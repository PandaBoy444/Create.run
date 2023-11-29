if (feature('starter items')) {
    PlayerEvents.loggedIn((event) => {
        if (!event.player.getPersistentData().getBoolean('starter'))
        {
            event.player.give(Item.of('create:wrench', 1))
            event.player.give(Item.of('create:clipboard', "{Pages:[{Entries:[{Checked:1b,Text:'{\"text\":\"Feed Betsy\"}'},{Checked:1b,Text:'{\"text\":\"Engine safty checks\"}'},{Checked:0b,Text:'{\"text\":\"Landing systems saftey checks\"}'},{Checked:1b,Text:'{\"text\":\"Make sure Pure Daisy is ready for landing (!!)\"}'},{Checked:0b,Text:'{\"text\":\"Think of cool name for company\"}'},{Checked:0b,Text:'{\"text\":\"Don\\'t crash\"}'},{Checked:0b,Text:'{\"text\":\"Ponder life\"}'},{Checked:1b,Text:'{\"text\":\"Fix wrench\"}'},{Checked:1b,Text:'{\"text\":\"Check automated milking system\"}'},{Checked:0b,Text:'{\"text\":\"Decide what to automate first\"}'}]}],PreviouslyOpenedPage:0,RepairCost:0,Type:1,display:{Name:'{\"text\":\"Day 931 - Landing!\",\"italic\":\"false\"}'}}"))
            event.player.getPersistentData().putBoolean('starter', true)
            event.player.getPersistentData().putBoolean('new_casing_compensated', true)
        }
        if (!event.player.getPersistentData().getBoolean('new_casing_compensated'))
        {
            event.player.give(Item.of('ptdye:cobblestone_casing', 8))
            event.player.give(Item.of('ptdye:redstone_casing', 12))
            event.player.getPersistentData().putBoolean('new_casing_compensated', true)
        }
    })
}