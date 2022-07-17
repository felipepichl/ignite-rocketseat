import { UploadCarImagesUseCase } from "./UploadCarImagesUseCase";

let uploadCarImagesUseCase: UploadCarImagesUseCase;

describe("Upload Car Image", () => {
  beforeEach(() => {
    uploadCarImagesUseCase = new UploadCarImagesUseCase();
  });

  it("should be able to uploads images to a car", async () => {
    await uploadCarImagesUseCase.execute();
  });
});
