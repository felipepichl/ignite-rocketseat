import { CarImagesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarImagesRepositoryInMemory";

import { UploadCarImagesUseCase } from "./UploadCarImagesUseCase";

let uploadCarImagesUseCase: UploadCarImagesUseCase;
let carImagesRepositoryInMemory: CarImagesRepositoryInMemory;

describe("Upload Car Image", () => {
  beforeEach(() => {
    carImagesRepositoryInMemory = new CarImagesRepositoryInMemory();
    uploadCarImagesUseCase = new UploadCarImagesUseCase(
      carImagesRepositoryInMemory
    );
  });

  it("should be able to uploads images to a car", async () => {
    const car_id = "car_id";
    const image_name = "image_name";

    await uploadCarImagesUseCase.execute({
      car_id,
      image_name,
    });
  });
});
