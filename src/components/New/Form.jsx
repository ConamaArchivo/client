import React from 'react';
import { useForm } from "react-hook-form";

const Form = () => {

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div class="general">
        <div class="field">
          <label for="title" class="big-label">Título</label>
          <input type="text" id="title" name="title" />
        </div>
        <div class="authors">
          <h3 class="big-label">Autor</h3>
          <div class="author">
            <div class="field">
              <label for="author-name1">Nombre</label>
              <input type="text" id="author-name1" name="author-name1" />
            </div>
            <div class="field">
              <label for="author-surname1">Apellido</label>
              <input type="text" id="author-surname1" name="author-surname1" />
            </div>
            <div class="field">
              <label for="author-country1">Nacionalidad</label>
              <select id="author-country1" name="author-country1">

              </select>
            </div>
            <div class="field">
              <label for="author-role1">Rol</label>
              <input type="text" id="author-role1" name="author-role1" />
            </div>
            <div class="divider"></div>
            <button type="button" class="add-author">&#43;</button>
          </div>
        </div>
        <div class="group">
          <div class="repertoire">
            <h3 class="big-label">Repertorio</h3>
            <div>
              <input
                type="radio"
                id="academic-rep"
                name="repertoire"
                value="Académico"
              />
              <label for="academic-rep">Académico</label>
            </div>
            <div>
              <input
                type="radio"
                id="popular-rep"
                name="repertoire"
                value="Popular"
              />
              <label for="popular-rep">Popular</label>
            </div>
          </div>
          <div class="genres field">
            <h3 class="big-label">Género</h3>
            <div class="genres-list">
              <input type="text" name="genre" />
              <button type="button" class="add-genre">&#43;</button>
            </div>
          </div>
        </div>
        <div class="field">
          <label for="comment" class="big-label">Observaciones</label>
          <textarea rows="3" id="comment" name="comment"> </textarea>
        </div>
      </div>
      <div class="versions">
        <div class="version">
          <div class="arr-authors">
            <div class="arrangement big-label">
              <h3>Arreglador</h3>
              <label class="switch">
                <input type="checkbox" />
                <span class="slider"></span>
              </label>
            </div>
            <div class="arr-author">
              <div class="field">
                <label for="arr-author-name1">Nombre</label>
                <input
                  type="text"
                  id="arr-author-name1"
                  name="arr-author-name1"
                />
              </div>
              <div class="field">
                <label for="arr-author-surname1">Apellido</label>
                <input
                  type="text"
                  id="arr-author-surname1"
                  name="arr-author-surname1"
                />
              </div>
              <div class="field">
                <label for="arr-author-country1">Nacionalidad</label>
                <select id="arr-author-country1" name="arr-author-country1">

                </select>
              </div>
              <div class="field">
                <label for="arr-author-role1">Rol</label>
                <input
                  type="text"
                  id="arr-author-role1"
                  name="arr-author-role1"
                />
              </div>
              <div class="divider"></div>
              <button type="button" class="add-arr-author">&#43;</button>
            </div>
          </div>
          <div class="group voices-group">
            <div class="voices">
              <h3 class="big-label">Voces</h3>
              <div class="group">
                <select id="gender" name="gender">
                  <option value="Mixto">Mixto</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                </select>
                <span>a</span>
                <input
                  type="number"
                  id="num-voices"
                  name="num-voices"
                  placeholder="n° de voces"
                />
                <span>voces</span>
              </div>
            </div>
            <div class="field accompaniment">
              <label class="big-label" for="accompaniment"
                >Acompañamiento</label
              >
              <div class="genres-list">
                <input type="text" id="accompaniment" name="accompaniment" />
                <button type="button" class="add-accompaniment">&#43;</button>
              </div>
            </div>
          </div>
          <div class="group files">
            <div class="field">
              <h3 class="big-label">Archivo</h3>
              <div class="group">
                <div class="field">
                  <label for="originals">Originales</label>
                  <input type="number" id="originals" name="originals" />
                </div>
                <div class="field">
                  <label for="copies">Copias</label>
                  <input type="number" id="copies" name="copies" />
                </div>
              </div>
              <label class="pdf" for="pdf">Subir PDF</label>
              <input type="file" id="pdf" name="pdf" />
            </div>
            <div class="field">
              <h3 class="big-label">Ubicación</h3>
              <div class="group">
                <div class="field">
                  <label for="cabinet">Armario</label>
                  <input type="text" id="cabinet" name="cabinet" />
                </div>
                <div class="field">
                  <label for="box">Caja</label>
                  <input type="text" id="box" name="box" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="buttons">
          <button type="button" class="add-version">&#43;</button>
          <input id="save" type="submit" value="Guardar" />
        </div>
      </div>
    </form>
  );
};

export default Form;
