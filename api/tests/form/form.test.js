import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import isReact from "is-react";

import CreateVideogame from "../../../client/src/components/CreateVideogame";

configure({ adapter: new Adapter() });

describe("<CreateVideogame/>", () => {

  beforeAll(() => expect(isReact.classComponent(CreateVideogame)).toBeFalsy());

  describe("Estructura", () => {
    let createVideogame;
    let store = mockStore(state);
    beforeEach(() => {
      createVideogame = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/videogame']}>
            <CreateHouse />
          </MemoryRouter>
        </Provider>
      );
    });

    it("Debería renderizar un form", () => {
      expect(createVideogame.find("form")).toHaveLength(1);
    });

    it('Debería renderizar un label con el texto "Name *"', () => {
      expect(createVideogame.find("label").at(0).text()).toEqual("Name *");
    });

    it('Debería renderizar un input con la propiedad "name" igual a "name"', () => {
      expect(createVideogame.find('input[name="name"]')).toHaveLength(1);
    });

    it('Debería renderizar un label con el texto "Description *', () => {
      expect(createVideogame.find("label").at(1).text()).toEqual("Description *");
    });

    it('Debería renderizar un label con el texto "Rating"', () => {
      expect(createVideogame.find("label").at(2).text()).toEqual("Rating");
    });

    it('Debería renderizar un input con la propiedad "name" igual a "rating"', () => {
      expect(createVideogame.find('input[name="rating"]')).toHaveLength(1);
    });

    it('Debería renderizar un button con "type" igual a "submit" y con texto "Create videogame"', () => {
      expect(createVideogame.find('button[type="submit"]')).toHaveLength(1);
      expect(createVideogame.find("button").at(0).text()).toEqual("Create videogame");
    });
  })})