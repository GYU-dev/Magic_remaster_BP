execute if score @s magic_system matches 25..30 as @p[r=3,tag=used_magic_player_shamaku] run particle minecraft:smash_ground_particle ~ ~ ~
execute if score @s magic_system matches 25..30 as @p[r=3,tag=used_magic_player_shamaku] run particle minecraft:smash_ground_particle_center ~ ~ ~
execute if score @s magic_system matches 25..30 run effect @a[r=10] blindness 5 0 true
execute if score @s magic_system matches 25..30 as @p[r=3,tag=used_magic_player_shamaku] run particle minecraft:huge_explosion_emitter ~ ~ ~
execute if score @s magic_system matches 30 run playsound random.totem @a[r=32] ~ ~ ~ 1.0 0.5
execute if score @s magic_system = @p[r=3,tag=used_magic_player_shamaku] magic_system at @p[r=3,tag=used_magic_player_shamaku] run tp @s ~ ~ ~ ~ ~
scoreboard players remove @s magic_system 1
scoreboard players remove @p[r=3,tag=used_magic_player_shamaku] magic_system 1
execute if score @s magic_system matches 0 run tag @p[r=3,tag=used_magic_player_shamaku] remove used_magic_player_shamaku
tag @s[scores={magic_system=0}] add "!!remove"