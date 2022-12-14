package com.project38.pubtalkapp.repo;

import com.project38.pubtalkapp.model.Artist;
import com.project38.pubtalkapp.model.PRO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ArtistRepo extends JpaRepository<Artist, Long> {

//    @Modifying
//    @Query(value =
//            "UPDATE artists SET artist_name = ?, artist_image_url = ?, pro = ?, proipi = ? WHERE id = ?;",
//            nativeQuery = true)
//    Artist updateArtist(Artist artist);

}
