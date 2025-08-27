from PIL import Image

def resize_image(input_path, output_path, new_width, new_height, resample_method="lanczos"):
  """
  修改图片尺寸并处理 RGBA 到 RGB 的转换。

  Args:
    input_path:  输入图片文件的路径。
    output_path: 输出图片文件的路径。
    new_width:   新的宽度，以像素为单位。
    new_height:  新的高度，以像素为单位。
    resample_method: 重采样方法。可选值：
      - "nearest":  最近邻插值法。
      - "box":      盒状滤波。
      - "bilinear": 双线性插值。
      - "hamming":  汉明滤波。
      - "bicubic":  双三次插值。
      - "lanczos":  兰索斯插值。
  """
  try:
    img = Image.open(input_path)

    # 映射重采样方法字符串到 PIL 对应的常量

    if hasattr(Image, 'Resampling'): # 检查 Pillow 版本，使用 Resampling
      resample_methods = {
          "nearest": Image.Resampling.NEAREST,
          "box": Image.Resampling.BOX,
          "bilinear": Image.Resampling.BILINEAR,
          "hamming": Image.Resampling.HAMMING,
          "bicubic": Image.Resampling.BICUBIC,
          "lanczos": Image.Resampling.LANCZOS
      }
    else:
      resample_methods = {
          "nearest": Image.NEAREST,
          "box": Image.BOX,
          "bilinear": Image.BILINEAR,
          "hamming": Image.HAMMING,
          "bicubic": Image.BICUBIC,
          "lanczos": Image.LANCZOS
      }


    if resample_method.lower() not in resample_methods:
      raise ValueError(f"Invalid resample_method: {resample_method}.  Valid options are: {', '.join(resample_methods.keys())}")

    resample = resample_methods[resample_method.lower()]

    # 转换 RGBA 为 RGB (如果图像是 RGBA 格式)
    if img.mode == "RGBA":
      img = img.convert("RGB")

    # 执行 resizing 操作
    resized_img = img.resize((new_width, new_height), resample=resample)

    # 保存修改后的图片
    resized_img.save(output_path, "JPEG")  # 显式指定保存为 JPEG 格式

    print(f"Image resized and saved to {output_path}")

  except FileNotFoundError:
    print(f"Error: Input file not found: {input_path}")
  except Exception as e:
    print(f"An error occurred: {e}")


# 示例用法:
if __name__ == "__main__":
  input_image_path = "C:\\Users\\Administrator\\Downloads\\logo (2).png" # 替换为你的输入图片路径 (可以是 PNG, 包含透明度)
  output_image_path = "C:\\Users\\Administrator\\Downloads\\logo12.png" # 替换为你的输出图片路径
  new_width = 1200
  new_height = 1200
  resample_method = "lanczos"

  resize_image(input_image_path, output_image_path, new_width, new_height, resample_method)
