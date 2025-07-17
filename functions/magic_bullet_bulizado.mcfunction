tp @s[scores={magic_system=!0..}] ^ ^ ^1 ~ ~
effect @s invisibility infinite 255 true
execute positioned ~ ~-1 ~ if entity @a[r=2,tag=!used_magic_player_bulizado] run scoreboard players set @s[scores={magic_system=!0..}] magic_system 50
execute positioned ~ ~-1 ~ if entity @e[family=mob,type=!armor_stand,r=2] run scoreboard players set @s[scores={magic_system=!0..}] magic_system 50
execute unless block ^ ^ ^0.5 air run scoreboard players set @s[scores={magic_system=!0..}] magic_system 50
execute if entity @s[scores={magic_system=50}] at @p[r=3] run fill ~-1 ~-1 ~-1 ~1 ~2 ~1 ice keep
execute if entity @s[scores={magic_system=50}] at @e[family=mob,type=!armor_stand,r=3] run fill ~-1 ~-1 ~-1 ~1 ~2 ~1 ice keep
execute if entity @s[scores={magic_system=50}] unless block ^ ^ ^0.5 air run fill ~-1 ~-1 ~-1 ~1 ~1 ~1 ice keep
execute unless entity @p[r=32] run tag @s add "!!remove"
execute if entity @s[scores={magic_system=0}] at @p[r=3]run fill ~-2 ~-2 ~-2 ~2 ~2 ~2 air replace ice
execute if entity @s[scores={magic_system=0}] at @e[family=mob,type=!armor_stand,r=3] run fill ~-2 ~-2 ~-2 ~2 ~2 ~2 air replace ice
execute if entity @s[scores={magic_system=0}] unless block ^ ^ ^0.5 air run fill ~-2 ~-2 ~-2 ~2 ~2 ~2 air replace ice
execute if entity @s[scores={magic_system=0}] run playsound random.glass @a[r=32] ~ ~ ~ 1.0 1.0 0.0
execute if entity @s[scores={magic_system=0}] run damage @a[r=3] 1 freezing
execute if entity @s[scores={magic_system=0}] run damage @e[family=mob,type=!armor_stand,r=3] 1 freezing
execute if entity @s[scores={magic_system=0}] run tag @s add "!!remove"
tag @s add element_ice
scoreboard players remove @s magic_system 1