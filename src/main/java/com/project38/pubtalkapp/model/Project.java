package com.project38.pubtalkapp.model;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "projects")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
//    @NotBlank(message = "Project name is required!")
    private String projectName;
//    @NotBlank(message = "Project cover art url is required!")
    private String projectImageUrl;
//    @NotBlank(message = "Number of tracks is required!")
    private Integer numOfTracks;
    private Duration projectLength;

    @ManyToMany(mappedBy = "artistProjects")
    private List<Artist> artist = new ArrayList<>();

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "project_track",
            joinColumns = {@JoinColumn(name = "project_id")},
            inverseJoinColumns = {@JoinColumn(name = "track_id")}
    )
    private List<Track> trackList = new ArrayList<>();
}
