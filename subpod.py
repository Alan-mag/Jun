class Subpod(object):
    title = ''
    text = ''
    img = ''

    def __init__(self, title, text, img):
        self.title = title
        self.text = text
        self.img = img

    def __repr__(self):
        return "%s %s %s" % (self.title, self.text, self.img)

    def __str__(self):
        return "%s %s %s" % (self.title, self.text, self.img)

def make_subpod(title, text, img):
    """Creates a subpod object"""
    subpod = Subpod(title, text, img)
    return subpod
