execute if score @s magic_system matches 200 if score @s magic_system = @p[r=3,tag=used_magic_player_rezo] magic_system as @p[r=3,tag=used_magic_player_rezo] at @s run playsound mob.warden.sonic_charge @a[r=10] ~ ~ ~ 1.0 0.2
execute if score @s magic_system matches 40..200 if score @s magic_system = @p[r=3,tag=used_magic_player_rezo] magic_system as @p[r=3,tag=used_magic_player_rezo] run effect @s slowness 1 0 true
execute if score @s magic_system matches 200 if score @s magic_system = @p[r=3,tag=used_magic_player_rezo] magic_system as @p[r=3,tag=used_magic_player_rezo] run tellraw @a[r=10] {"rawtext":[{"text":"<"},{"selector":"@s"},{"text":"> 静寂はやがて空気に共鳴し、"}]}
execute if score @s magic_system matches 150 if score @s magic_system = @p[r=3,tag=used_magic_player_rezo] magic_system as @p[r=3,tag=used_magic_player_rezo] run tellraw @a[r=10] {"rawtext":[{"text":"<"},{"selector":"@s"},{"text":"> 集いし波はやがて空気を切り裂く。"}]}
execute if score @s magic_system matches 100 if score @s magic_system = @p[r=3,tag=used_magic_player_rezo] magic_system as @p[r=3,tag=used_magic_player_rezo] run tellraw @a[r=10] {"rawtext":[{"text":"<"},{"selector":"@s"},{"text":"> 音は力、力は衝撃、衝撃は破壊。"}]}
execute if score @s magic_system matches 50 if score @s magic_system = @p[r=3,tag=used_magic_player_rezo] magic_system as @p[r=3,tag=used_magic_player_rezo] run tellraw @a[r=10] {"rawtext":[{"text":"<"},{"selector":"@s"},{"text":"> 今こそ、轟け。"}]}
execute if score @s magic_system matches 20 if score @s magic_system = @p[r=3,tag=used_magic_player_rezo] magic_system as @p[r=3,tag=used_magic_player_rezo] run tellraw @a[r=10] {"rawtext":[{"text":"<"},{"selector":"@s"},{"text":">  -§2§lレゾ§r。"}]}
execute if score @s magic_system matches 20 run summon magic_remaster:magic_dummy ~ ~0.5 ~ ~ ~ minecraft:entity_spawned magic_bullet_rezo
execute if score @s magic_system = @p[r=3,tag=used_magic_player_rezo] magic_system at @p[r=3,tag=used_magic_player_rezo] run tp @s ^ ^1 ^1 ~ ~
scoreboard players remove @s magic_system 1
scoreboard players remove @p[r=3,tag=used_magic_player_rezo] magic_system 1
execute if score @s magic_system matches 0 run tag @p[r=3,tag=used_magic_player_rezo] remove used_magic_player_rezo
tag @s[scores={magic_system=0}] add "!!remove"
scoreboard players operation @e[type=magic_remaster:magic_dummy,name=magic_bullet_rezo,r=1] magic_system = @s magic_system