import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import Movie from './Movie';
 
describe('Movie', () => {
  const smallMovieMock = {
    id: 1,
    imageSrc: "some-small-movie-src",
    title: "some-small-movie-title",
    date: "2012-07-14T01:00:00+01:00",
    synopsis: "some-small-movie-synopsis"
  }
  const largeMovieMock = {
    id: 1,
    imageSrc: "some-large-movie-src",
    title: "some-large-movie-title",
    date: "2019-07-14T01:00:00+01:00",
    synopsis: "some-large-movie-synopsis",
    genres: [ { name: "some-genre" }, { name: "some-other-genre" } ],
    rating: 4,
  }
  
  describe("Small movie component", () => {
    let rendered;
    beforeEach(() => {
      rendered = render(
        <MemoryRouter>
          <Movie movie={smallMovieMock} />
        </MemoryRouter>
      );
    })

    test("Shouldn't have + button", () => {
      const el = rendered.queryByText("+");
      expect(el).toBeFalsy();
    })
  })

  describe("Large movie component", () => {
    let rendered;
    beforeEach(() => {
      rendered = render(
        <MemoryRouter>
          <Movie movie={largeMovieMock} />
        </MemoryRouter>
      );
    })
    
    test("Should have + button", () => {
      expect(rendered.queryByText("+")).toBeTruthy();
    })

    test("Should open the category picker", async() => {
      expect(rendered.queryByText("Create category")).toBeFalsy()
      fireEvent.click(rendered.getByText('+'))
      await waitFor(() => expect(rendered.queryByText("Create category")).toBeTruthy());
    })
  })
});