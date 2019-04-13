canvas-pacman
=============

A Canvas Implementation of the original Pacman with Mobile support

Features already available:
 - Ghosts with waypoint movement (fully random currently)
 - Collision detection with pacman (ghosts, fruits, pacs)
 - Pacman able to eat ghosts after noming an ultra Pac
 - Point counter
 - New life every 10,000 points
 - Input-agnostic movement mechanics for all units (so all AI/pacman, doesn't matter what input you control it with, it's states that get evaluated)
 - Lives tracking
 - Full Rendering of all components (everything procedural, including animations) as well as all drawings based on calculations of available size - so full scaling is in place.
 - All animations and movements based on time delta
 - Map creating is procedural based on a map config, can be altered fully (some layouts might have bugs that need to be fixed, not all permutations have been tested)
 - The teleportation points (both vertical, and horizontal, if vertical ever gets put into place, are available) - available to be used for any sprite entity
 - Waypoint lookup, and point to point route calculation helpers have been made.

... There may be more, but that was off the top of my head.