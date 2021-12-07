import { Component, Input, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmPopUpComponent } from '../../confirm-pop-up/confirm-pop-up.component';
import { FormPopUpComponent } from '../../form-pop-up/form-pop-up.component';

const OPTIONS_OWNER_POSTS: String[] = ["Editar", "Eliminar", "Promocionar"];
const OPTIONS_ANOTHER_POSTS: String[] = ["Guardar", "Copiar", "Denunciar publicación"];

@Component({
    selector: 'app-reaction',
    templateUrl: './reaction.component.html',
    styleUrls: ['./reaction.component.scss']
})
export class ReactionComponent implements OnInit {

    @Input() type: String = "";
    @Input() quantity: number = 0;
    @Input() postId: number = 0;
    pathImg: String = "";
    isOpen: boolean = false;
    options: String[] = [];


    constructor(private postSvc: PostService,
        private matDialog: MatDialog,) { }

    ngOnInit(): void {
        if (this.type == "like") {
            if (this.postSvc.isLiked(this.postId))
                this.pathImg = "../../../../../assets/posts/megustalleno.svg";
            else
                this.pathImg = "../../../../../assets/posts/megusta.svg";
        } else if (this.type == "dislike") {
            if (this.postSvc.isDisliked(this.postId))
                this.pathImg = "../../../../../assets/posts/dislikelleno.svg";
            else
                this.pathImg = "../../../../../assets/posts/dislike.svg";
        } else if (this.type == "comment") {
            this.pathImg = "../../../../../assets/posts/comentar.svg";
        } else if (this.type == "share") {
            this.pathImg = "../../../../../assets/posts/compartir.svg";
        } else if (this.type == "options") {
            this.pathImg = "../../../../../assets/posts/options.svg";
            if (this.postSvc.itsMyPost(this.postId))
                this.options = OPTIONS_OWNER_POSTS;
            else
                this.options = OPTIONS_ANOTHER_POSTS;
        }
    }

    react() {
        if (this.type == "like") {
            if (this.postSvc.isLiked(this.postId)) {
                this.postSvc.likeDown(this.postId);
                this.pathImg = "../../../../../assets/posts/megusta.svg";
            } else {
                this.postSvc.likeUp(this.postId);
                this.pathImg = "../../../../../assets/posts/megustalleno.svg";
            }
        } else if (this.type == "comment") {

        } else if (this.type == "share") {

        } else if (this.type == "dislike") {
            if (this.postSvc.isDisliked(this.postId)) {
                this.postSvc.dislikeDown(this.postId);
                this.pathImg = "../../../../../assets/posts/dislike.svg";
            } else {
                this.postSvc.dislikeUp(this.postId);
                this.pathImg = "../../../../../assets/posts/dislikelleno.svg";
            }
        } else if (this.type == "options") {
            this.isOpen = !this.isOpen;
        }
    }

    action(action: String) {
        this.isOpen = false;
        if (action === "Eliminar") {
            this.openDialog("eliminar", "No podrá recuperar la publicación más tarde.");
        } else if (action === "Promocionar") {
            this.openDialog("promocionar", "Se le enviará un correo con los datos para abonar. Al confirmar el pago, su publicación aparecerá primera en el muro de los demás usuarios.");
        } else if (action == "Denunciar publicación") {
            this.openDialog("denunciar", "Analizaremos su denuncia y trataremos de no mostrarle este tipo de publicaciones en el futuro.");
        }
    }


    openDialog(action: string, warning: string) {
        if (action == "promocionar") {
            this.matDialog.open(FormPopUpComponent, {});
        } else {
            this.matDialog.open(ConfirmPopUpComponent, {
                data: {
                    action: action,
                    warning: warning,
                }
            });
        }
    }

}
