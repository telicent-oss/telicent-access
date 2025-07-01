// src/components/Backups/api.test.js
import axios from "axios";
import { backupAPI, compare } from "./api";

jest.mock("axios");

beforeEach(() => jest.resetAllMocks());

const baseUrl = "api.com";
describe("compare", () => {
  test("orders descending by date", () => {
    const older = { date: 1 };
    const newer = { date: 2 };
    expect(compare(older, newer)).toBe(1);
    expect(compare(newer, older)).toBe(-1);
    expect(compare(older, older)).toBe(0);
  });
});

describe("backupAPI.scg", () => {
  test("list", async () => {
    axios.get.mockResolvedValue({
      data: {
        backups: {
          1: {
            "backup-id": 1,
            date: "2025-06-24_13-49-52",
            datasets: [
              { "dataset-id": "knowledge" },
              { "dataset-id": "catalog" },
            ],
          },
          2: {
            "backup-id": 2,
            date: "2025-06-24_13-57-46",
            datasets: [
              { "dataset-id": "knowledge" },
              { "dataset-id": "ontology" },
            ],
          },
        },
      },
    });

    const list = await backupAPI.scg.getList(baseUrl);
    expect(
      list.map(({ id, dateTaken, datasets }) => ({ id, dateTaken, datasets }))
    ).toMatchInlineSnapshot(`
Array [
  Object {
    "datasets": Array [
      "knowledge",
      "ontology",
    ],
    "dateTaken": "24 June 2025 - 13:57:46",
    "id": 2,
  },
  Object {
    "datasets": Array [
      "knowledge",
      "catalog",
    ],
    "dateTaken": "24 June 2025 - 13:49:52",
    "id": 1,
  },
]
`);
    expect(axios.get).toHaveBeenCalledWith(`${baseUrl}/backups/list`);
  });

  test("create", async () => {
    axios.post.mockResolvedValue({ ok: true });
    await expect(backupAPI.scg.create(baseUrl)).resolves.toEqual({ ok: true });
    expect(axios.post).toHaveBeenCalledWith(`${baseUrl}/backups/create`);
  });

  test("delete", async () => {
    axios.post.mockResolvedValue({ ok: true });
    await expect(backupAPI.scg.delete(baseUrl, "id1")).resolves.toEqual({
      ok: true,
    });
    expect(axios.post).toHaveBeenCalledWith(`${baseUrl}/backups/delete/id1`);
  });

  test("restore", async () => {
    axios.post.mockResolvedValue({ ok: true });
    await expect(backupAPI.scg.restore(baseUrl, "id2")).resolves.toEqual({
      ok: true,
    });
    expect(axios.post).toHaveBeenCalledWith(`${baseUrl}/backups/restore/id2`);
  });
});
