import {Artist} from "./artist";
import {Project} from "./project";

export interface Track {
  id: number;
  trackName: string;
  trackImageUrl: string;
  trackUrl: string;
  trackLength: number;
  artist: Artist[];
  project: Project[];
}
