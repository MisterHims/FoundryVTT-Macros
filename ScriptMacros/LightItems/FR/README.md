# LightItems

![Foundry Badge](https://img.shields.io/badge/Foundry-v0.5.5-informational)

* **Author**: Foundry VTT Community, MisterHims
* **Traduction**: MisterHims
* **Version**: 1.0.1
* **Foundry VTT Compatibility**: 0.5.5+
* **System Compatibility**: DnD5e
* **Module Requirement(s)**: [Minor Quality of Life](https://gitlab.com/tposney/minor-qol/tree/master), [The Furnace](https://github.com/kakaroto/fvtt-module-furnace)

## Description

LightItems est une collection de macros qui permettra de simuler la lumière générée par divers objects comme une torche, une lampe ou encore une lanterne utilisée par un personnage. L'utilisation de ces objets consomment autimatique les ressources nécéssaires à leur utilisation (bougies, flasques d'huile, etc.). Cette collection est en partie issue de la communauté Foundry VTT mais a été traduite en français, modifiée puis convertie au système métrique.

## Collection de Macros

### Bougie

Permet d'utiliser une Bougie dans l'inventaire du token sélectionné. Cette utilisation vous offre le choix entre l'allumer ou l'éteindre. Un message apparaît dans la fenêtre de chat indiquant alors le nombre de Bougie(s) restante(s).

### Lampe

Permet d'utiliser une Lampe dans l'inventaire du token sélectionné. Cette utilisation vous offre le choix entre l'allumer ou l'éteindre. Un message apparaît dans la fenêtre de chat indiquant alors le nombre de flasques d'Huile(s) restante(s).

### Lanterne-a-capote

Permet d'utiliser une Lanterne à capote dans l'inventaire du token sélectionné. Cette utilisation vous offre le choix d'éteindre ou d'allumer la lanterne à lumière vive ou lumière forte, ce qui nécessite alors 1 Huile. Un message apparaît dans la fenêtre de chat indiquant alors le nombre de flasques d'Huile(s) restante(s).

![alt text](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/LightItems/FR/images/dem_01.gif)

### Lanterne-de-revelation

Permet d'utiliser une Lanterne de révélation dans l'inventaire du token sélectionné. Cette utilisation vous offre le choix d'allumer la lanterne de deux façons différentes - à lumière vive ou à lumière forte - dont chacune de ces actions nécessitent 1 Huile ou bien de l'éteindre. Un message apparaît également dans la fenêtre de chat indiquant alors le nombre de flasques d'Huile(s) restante(s).

### Lanterne-sourde

Permet d'utiliser une Lanterne sourde dans l'inventaire du token sélectionné. Cette utilisation vous offre le choix d'éteindre ou d'allumer la lanterne à lumière vive ou lumière forte, ce qui nécessite alors 1 Huile. Un message apparaît dans la fenêtre de chat indiquant alors le nombre de flasques d'Huile(s) restante(s).

### Torche

Permet d'utiliser une Torche dans l'inventaire du token sélectionné. Cette utilisation vous offre le choix entre l'allumer, l'éteindre ou ne rien faire. Un message apparaît également dans la fenêtre de chat vous permettant d'utiliser l'action qui est associée à l'objet.

## Installation

### Installation de Consum-Generic

Le code suivant est nécessaire à l'utilisation de toutes les autres macros de la collection.

1. Copiez le code ci-dessous ou accédez-y depuis la [Collection](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/LumenVision/FR/Collection/Consum-Generic.js) sous le nom de "Consum-Generic.js" :

   ```javascript
   let updates = [];
   let consumed = "";
   let consumableName = args[0];
   let item = actor.items.find(i => i.name === consumableName);
   if (!item) {
       ui.notifications.warn(`Aucun consommable nommé "${consumableName}" n'a été trouvé`);
       return;
   }
   if (item.data.data.quantity < 1) {
       ui.notifications.warn(`Vous n'avez plus de ${consumableName} restante(s)`);
   } else {
       updates.push({ "_id": item._id, "data.quantity": item.data.data.quantity - 1 });
       consumed += `${item.data.data.quantity - 1} ${consumableName}(s) restante(s)<br>`;
       //AudioHelper.play({ src: "sounds/items-use/lantern.mp3", volume: 0.8, autoplay: true, loop: false }, true);
   }
   if (updates.length > 0) {
       actor.updateEmbeddedEntity("OwnedItem", updates);
       ChatMessage.create({
           user: game.user._id,
           speaker: { actor: actor, alias: actor.name },
           content: consumed,
           type: CONST.CHAT_MESSAGE_TYPES.OTHER
       });
   }
   ```

   *[Consum-Generic.js](https://github.com/MisterHims/FoundryVTT/blob/master/ScriptMacros/LumenVision/FR/Collection/Consum-Generic.js)*

2. Allez maintenant sur Foundry VTT puis cliquez sur un emplacement libre de la barre de macros afin d'en créer une nouvelle.

3. Sélectionnez le type "Script" puis collez le code à l'intérieur.

4. Donnez-lui exactement le nom suivant : ``` consum-generic ``` et sauvegardez la macro.

5. Vous n'aurez pas besoin de la macro à cet emplacement et vous pouvez donc là retirer (mais pas supprimer).

### Installation de toutes les autres macros

* De la même façon que vu précédemment, vous pouvez répéter la même opération pour installer toutes les autres macros disponibles dans la collection. Vous êtes cependant libres de donner à ces macros le nom de votre choix.

**Attention !** Vérifiez bien le nom de vos objets dans l'inventaire de votre personnage. Si vous avez par exemple utilisé le compendium AideDD Items pour ajouter des flasques d'Huile, renommez l'objet en "Huile" et non pas "Flasques d'huile (10)".

## Améliorations à venir

* Ajouter la possibilité de pouvoir faire jouer un son lors de l'utilisation d'un objet. Par exemple, le son d'une lanterne que l'on allume.

* Création de la collection sous forme de module, permettant l'ajout automatique de toute la collection LumenVision dans un compendium unique.

* Utilisation du code générique pour appliquer ses divers effets sur des items et aptitudes en particulier.