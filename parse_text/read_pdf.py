import fitz
import sys

def read_PDF(path):
    with fitz.open(path) as doc:
        text = ""
        for page in doc:
            text += page.get_text()
        with open(f'../recipe_text/{text[:20]}.txt', 'w') as f:
            f.write(text)

read_PDF('../recipes/sample_recipe.pdf')
sys.stdout.flush()