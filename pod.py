class Pod(object): 
    title = ""
    subpods = []

    def __init__(self, title, podsubpod):
        self.title = title
        self.podsubpod = podsubpod

    def __repr__(self):
        return "%s %s" % (self.title, self.podsubpod)

    def __str__(self):
        return "%s %s" % (self.title, self.podsubpod)



def make_pod(title, podsubpod):
    """Creates a pod object"""
    pod = Pod(title, podsubpod)
    return pod