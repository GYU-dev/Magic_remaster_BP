execute as @e[r=3,rm=0.1] at @s unless entity @s[type=item] unless entity @s[type=player] run damage @s 5 lava
execute as @e[r=3,rm=0.1] at @s unless entity @s[type=item] unless entity @s[type=player] facing entity @e[type=magic_remaster:magic_dummy,name=magicf103,r=3,rm=1,c=1] feet run tp @s ^ ^ ^0.3
execute as @e[r=25,rm=3] at @s unless entity @s[type=item] unless entity @s[type=player] facing entity @e[type=magic_remaster:magic_dummy,name=magicf103,r=25,rm=1,c=1] feet run tp @s ^ ^ ^0.1
execute as @e[r=50,rm=25] at @s unless entity @s[type=item] unless entity @s[type=player] facing entity @e[type=magic_remaster:magic_dummy,name=magicf103,r=50,rm=1,c=1] feet run tp @s ^ ^ ^0.05
particle minecraft:candle_flame_particle ^ ^ ^5
particle minecraft:candle_flame_particle ^ ^ ^-5
particle minecraft:candle_flame_particle ~ ~5 ~
particle minecraft:candle_flame_particle ~ ~-5 ~
tp @s ~ ~ ~ ~ ~30