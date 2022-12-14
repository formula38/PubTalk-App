import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {PRO} from "../../zshared/enums/pro";
import {ArtistsService} from "../../zshared/services/artists.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Artist} from "../../zshared/interfaces/artist";
import {tap} from "rxjs";

@Component({
  selector: 'app-artist-edit',
  templateUrl: './artist-edit.component.html',
  styleUrls: ['./artist-edit.component.css']
})
export class ArtistEditComponent implements OnInit {
  id: number;
  editMode = false;
  artist: Artist;
  artistForm: FormGroup;
  pro = PRO;
  proKeys = [];

  constructor(private artistsService: ArtistsService,
              private route: ActivatedRoute,
              private router: Router) {
    this.proKeys = Object.keys(this.pro);
    this.initForm();
  }

  ngOnInit(): void {

    this.route.params
      .subscribe(
        (param: Params) => {
          this.id = +param['id'];
          this.editMode = param['id'] != null;
          this.initForm()
        }
      );
  }

  private async initForm() {

    // TODO: Check what the numeric equivalent of default id is
    let id = -1;
    let artistName = '';
    let imagePath = '';
    let pro = '';
    let proIPI = '';

    if (this.editMode) {

      // TODO: Still getting "NG01052: formGroup expects a FormGroup instance" console error
      const artist = await this.artistsService
        .getArtist(this.id).toPromise();

      id = artist?.id
      artistName = artist?.artistName;
      imagePath = artist?.artistImageUrl;
      pro = artist?.pro;
      proIPI = artist?.proIPI;
    }

    this.artistForm = new FormGroup({
      id: new FormControl(id),
      artistName: new FormControl(artistName),
      artistImageUrl: new FormControl(imagePath),
      pro: new FormControl(pro),
      proIPI: new FormControl(proIPI)
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.artistsService
        .updateArtist(this.artistForm.value)
        .pipe(
          tap((artist: Artist) => {
            this.artist = artist;
          })
        ).subscribe();
    } else {
      this.artistsService
        .addArtist(this.artistForm.value)
        .pipe(
          tap((newArtist: Artist) => {
            this.artist = newArtist;
          })
        ).subscribe();
    }

    // TODO: Refresh artist list page with updated information on submit
    this.onCancel();
  }

  onCancel() {
    // TODO: See if ['/artists'] would work better
    this.router.navigate(
      ['../'],
      {relativeTo: this.route}
    );
  }
}
