let changeForm = false;
actor = actor ? actor : game.user.character;
let formActorId;
let formActor;
let cost = 1;

if (actor.isPolymorphed) {
    actor.revertOriginalForm();
    return;
}

let remainingShapes = actor.data.data.resources.primary.value;
if (remainingShapes < 1) return;

let d = new Dialog({
    title: "Forme sauvage",
    content: `
     <form>
     <div class="form-group">
         <label>Choix de la forme sauvage :</label>
         <select id="form-type" name="form-type">
         <option value="loup">Forme de Loup</option>
         <option value="crocodile">Forme de Crocodile</option>
         <option value="aigle">Forme d'Aigle'</option>
         </select>
     </div>
     </form>
     `,
    buttons: {
        yes: {
            icon: '<i class="fas fa-check"></i>',
            label: "Lancer",
            callback: () => changeForm = true
        },
        no: {
            icon: '<i class="fas fa-times"></i>',
            label: "Annuler"
        }
    },
    default: "yes",
    close: html => {
        if (changeForm) {
            let formType = html.find('[name="form-type"]')[0].value || "none";
            switch (formType) {
                case "loup":
                    formActorId = "k29xejd9bksJF9t2";
                    break;
                case "crocodile":
                    formActorId = "Y0d0Hy8FcBNYC79u";
                    break;
                case "aigle":
                    formActorId = "fTqB8K3WDossT1dE";
                    break;
            }
            formActor = game.actors.get(formActorId);
            actor.data.data.resources.primary.value = remainingShapes - cost;
            actor.transformInto(formActor, { keepMental: true, mergeSaves: true, mergeSkills: true, keepBio: true });
        }
    }
}).render(true);