<?php

// This file has been auto-generated by the Symfony Dependency Injection Component for internal use.

if (\class_exists(\Container1zi3cxD\srcApp_KernelDevDebugContainer::class, false)) {
    // no-op
} elseif (!include __DIR__.'/Container1zi3cxD/srcApp_KernelDevDebugContainer.php') {
    touch(__DIR__.'/Container1zi3cxD.legacy');

    return;
}

if (!\class_exists(srcApp_KernelDevDebugContainer::class, false)) {
    \class_alias(\Container1zi3cxD\srcApp_KernelDevDebugContainer::class, srcApp_KernelDevDebugContainer::class, false);
}

return new \Container1zi3cxD\srcApp_KernelDevDebugContainer([
    'container.build_hash' => '1zi3cxD',
    'container.build_id' => 'e8b3f874',
    'container.build_time' => 1587325956,
], __DIR__.\DIRECTORY_SEPARATOR.'Container1zi3cxD');