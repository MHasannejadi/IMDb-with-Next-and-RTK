import { useState, useEffect, ReactElement } from "react";
import apiKey from "../../../api/apiKey";
import { useSearchQuery } from "../../../services/movieApi";
import { useRouter } from "next/router";
import MovieCard from "../../../components/movieCard/movieCard";
import styles from "./search-page.module.scss";
import Layout from "../../../components/layout";
import { NextPageWithLayout } from "../../_app";

const SearchPage: NextPageWithLayout = () => {
  const router = useRouter();
  const {
    refetch,
    data = null,
    isLoading: isLoadingSearch,
  } = useSearchQuery(
    { query: router.query.q, key: apiKey },
    { skip: !router.query.q }
  );

  return (
    <div className={styles["search-page"]}>
      {isLoadingSearch ? (
        <div>Loading...</div>
      ) : (
        data?.results?.length > 0 && (
          <div>
            <h1>Results for &quot;{router.query.q}&quot;</h1>
            <ul>
              {data.results.map((movie: any) => (
                <MovieCard key={movie.id} movie={movie} addOrRemove="add" />
              ))}
            </ul>
          </div>
        )
      )}
    </div>
  );
};

SearchPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default SearchPage;