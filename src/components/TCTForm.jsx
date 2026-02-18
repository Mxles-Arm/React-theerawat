import { useState } from "react";

function XXXForm() {
  const [name, setName] = useState("");
  const [dept, setDept] = useState("");
  const [select, setSelect] = useState("");
  const [comment, setComment] = useState("");
  const [accept, setAccept] = useState(false);

  return (
    <div>
      <h1>XXX Form</h1>

      <div>
        <label>Name: </label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div>
        <label>What is it?</label>
        <input type="radio" name="rdDept" value="A" onChange={(e) => setDept(e.target.value)} /> A
        <input type="radio" name="rdDept" value="B" onChange={(e) => setDept(e.target.value)} /> B
        <input type="radio" name="rdDept" value="C" onChange={(e) => setDept(e.target.value)} /> C
      </div>

      <div>
        <label>What is it?</label>
        <select value={select} onChange={(e) => setSelect(e.target.value)}>
          <option value="">-- select something --</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </select>

        <div>Your select: {select}</div>
      </div>

      <hr />

      <div>
        <label>Leave your comment: </label>
        <textarea
          cols="20"
          rows="4"
          placeholder="Enter your comments here"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </div>

      <div>
        <label>Do you accept this?</label>
        <input
          type="checkbox"
          checked={accept}
          onChange={(e) => setAccept(e.target.checked)}
        /> Yes/No

        <hr />
        Accept: {accept ? "Yes" : "No"}
      </div>

      <hr />
      <input type="submit" value="Send" />
    </div>
  );
}

export default XXXForm;
